const normalizePhone = (value) => String(value || '').replace(/\D/g, '');

const buildOrderMessage = (order) => {
  const orderLines = (order.products || [])
    .map((item) => `- ${item.name} (${item.variant}) x ${item.quantity}`)
    .join('\n');

  return [
    'New Proteonix Order',
    '',
    `Products:\n${orderLines || '- N/A'}`,
    `Total: INR ${order.totalPrice}`,
    '',
    `Customer Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}, ${order.city} - ${order.pincode}`
  ].join('\n');
};

const sendTelegramNotification = async (message) => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return null;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram API failed: ${details}`);
  }

  const payload = await response.json();
  if (!payload.ok) {
    throw new Error(`Telegram API failed: ${JSON.stringify(payload)}`);
  }

  return {
    channel: 'telegram',
    messageId: payload.result?.message_id ? String(payload.result.message_id) : null
  };
};

const sendWhatsAppNotification = async (order, message) => {
  const { WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_ID, WHATSAPP_NUMBER, WHATSAPP_API_VERSION } =
    process.env;

  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_ID) {
    return null;
  }

  // Send to the checkout phone first; fallback to configured number for safety.
  const recipient = normalizePhone(order.phone) || normalizePhone(WHATSAPP_NUMBER);
  if (!recipient) {
    console.warn('WhatsApp recipient not available. Skipping order notification.');
    return null;
  }

  const apiVersion = WHATSAPP_API_VERSION || 'v20.0';
  const url = `https://graph.facebook.com/${apiVersion}/${WHATSAPP_PHONE_ID}/messages`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: recipient,
      type: 'text',
      text: {
        preview_url: false,
        body: message
      }
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`WhatsApp API failed: ${details}`);
  }

  const payload = await response.json();
  return {
    channel: 'whatsapp',
    messageId: payload?.messages?.[0]?.id || null
  };
};

const sendOrderNotification = async (order) => {
  const message = buildOrderMessage(order);

  const telegramResult = await sendTelegramNotification(message);
  if (telegramResult) {
    return telegramResult;
  }

  const whatsAppResult = await sendWhatsAppNotification(order, message);
  if (whatsAppResult) {
    return whatsAppResult;
  }

  console.warn('No notification provider configured. Skipping order notification.');
  return null;
};

module.exports = { sendOrderNotification };
