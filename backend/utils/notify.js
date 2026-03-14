const normalizePhone = (value) => String(value || '').replace(/\D/g, '');
const normalizeEnvString = (value) => {
  const normalized = String(value || '').trim();
  return normalized.length > 0 ? normalized : null;
};

const normalizeTelegramToken = (value) => {
  const token = normalizeEnvString(value);
  if (!token) {
    return null;
  }

  // Accept raw token, bot-prefixed token, or full API URL pasted by mistake.
  if (token.includes('api.telegram.org/bot')) {
    const match = token.match(/api\.telegram\.org\/bot([^/]+)/);
    return match?.[1] || null;
  }

  return token.startsWith('bot') ? token.slice(3) : token;
};

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
  const token = normalizeTelegramToken(process.env.TELEGRAM_BOT_TOKEN);
  const chatId = normalizeEnvString(process.env.TELEGRAM_CHAT_ID);

  if (!token || !chatId) {
    return null;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram API failed (${response.status}): ${details}`);
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
  const accessToken = normalizeEnvString(process.env.WHATSAPP_ACCESS_TOKEN);
  const phoneId = normalizeEnvString(process.env.WHATSAPP_PHONE_ID);
  const fallbackNumber = normalizeEnvString(process.env.WHATSAPP_NUMBER);
  const apiVersion = normalizeEnvString(process.env.WHATSAPP_API_VERSION) || 'v20.0';

  if (!accessToken || !phoneId) {
    return null;
  }

  // Send to the checkout phone first; fallback to configured number for safety.
  const recipient = normalizePhone(order.phone) || normalizePhone(fallbackNumber);
  if (!recipient) {
    console.warn('WhatsApp recipient not available. Skipping order notification.');
    return null;
  }

  const url = `https://graph.facebook.com/${apiVersion}/${phoneId}/messages`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
    throw new Error(`WhatsApp API failed (${response.status}): ${details}`);
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
