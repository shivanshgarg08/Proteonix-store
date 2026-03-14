const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const products = require('./data/products');
const Order = require('./models/Order');
const User = require('./models/User');
const { sendOrderNotification } = require('./utils/notify');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const memoryOrders = [];
const memoryUsers = [];
let dbInitPromise = null;

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('MONGO_URI not set. Orders will be stored in memory only.');
    return;
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};

const ensureDBConnected = async () => {
  if (!dbInitPromise) {
    dbInitPromise = connectDB().catch((error) => {
      dbInitPromise = null;
      throw error;
    });
  }

  return dbInitPromise;
};

app.use(async (req, res, next) => {
  try {
    await ensureDBConnected();
  } catch (error) {
    console.error('DB init middleware failed:', error.message);
  }
  next();
});

const getJwtSecret = () => process.env.JWT_SECRET || 'proteonix-demo-secret';

const authOptional = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return next();
  }

  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) {
    return next();
  }

  try {
    req.user = jwt.verify(token, getJwtSecret());
  } catch (error) {
    console.warn('Invalid auth token');
  }

  return next();
};

const findUserByContact = async (contact) => {
  const isConnected = mongoose.connection.readyState === 1;
  if (isConnected) {
    return User.findOne({ contact });
  }
  return memoryUsers.find((user) => user.contact === contact);
};

const saveUser = async (payload) => {
  const isConnected = mongoose.connection.readyState === 1;
  if (isConnected) {
    return User.create(payload);
  }
  const stored = { ...payload, _id: `mem-${Date.now()}` };
  memoryUsers.push(stored);
  return stored;
};

const createToken = (user) =>
  jwt.sign({ id: user._id, name: user.name, contact: user.contact }, getJwtSecret(), {
    expiresIn: '7d'
  });

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/auth/register', async (req, res) => {
  const { name, contact, password } = req.body;

  if (!name || !contact || !password) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const existing = await findUserByContact(contact);
  if (existing) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await saveUser({ name, contact, passwordHash });
  const token = createToken(user);

  return res.status(201).json({
    token,
    user: { id: user._id, name: user.name, contact: user.contact }
  });
});

app.post('/api/auth/login', async (req, res) => {
  const { contact, password } = req.body;

  if (!contact || !password) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const user = await findUserByContact(contact);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  const token = createToken(user);
  return res.json({
    token,
    user: { id: user._id, name: user.name, contact: user.contact }
  });
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/orders', async (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;

  if (!isConnected) {
    return res.json(memoryOrders);
  }

  const orders = await Order.find().sort({ orderTime: -1 }).limit(50);
  return res.json(orders);
});

app.post('/api/order', authOptional, async (req, res) => {
  const { name, phone, address, city, pincode, products: items, totalPrice } = req.body;

  if (!name || !phone || !address || !city || !pincode || !items || !totalPrice) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const orderPayload = {
    name,
    phone,
    address,
    city,
    pincode,
    products: items,
    totalPrice,
    orderTime: new Date(),
    userId: req.user ? req.user.id : null
  };

  const isConnected = mongoose.connection.readyState === 1;

  if (isConnected) {
    await Order.create(orderPayload);
  } else {
    memoryOrders.push(orderPayload);
  }

  let notificationSent = false;
  let notificationError = null;

  try {
    const notifyResult = await sendOrderNotification(orderPayload);
    if (!notifyResult) {
      notificationError = 'No notification provider configured.';
    } else {
      notificationSent = Boolean(notifyResult.messageId);
      if (notificationSent) {
        console.log(`${notifyResult.channel} notification sent:`, notifyResult.messageId);
      } else {
        notificationError = `${notifyResult.channel} notification did not return a message id.`;
      }
    }
  } catch (error) {
    notificationError = error.message;
    console.error('Notification failed:', error.message);
  }

  return res.status(201).json({
    message: 'Order placed successfully.',
    notificationSent,
    notificationError
  });
});

if (require.main === module) {
  ensureDBConnected().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
}

module.exports = app;
