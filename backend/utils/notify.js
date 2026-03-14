const sendOrderNotification = async (order) => {
  const {
    WHATSAPP_ACCESS_TOKEN,
    WHATSAPP_PHONE_ID,
    WHATSAPP_NUMBER,
    WHATSAPP_API_VERSION
  } = process.env;

  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_ID || !WHATSAPP_NUMBER) {
    console.warn('WhatsApp API not configured. Skipping order notification.');
    return;
  }

  const orderLines = (order.products || [])
    .map((item) => `- ${item.name} (${item.variant}) x ${item.quantity}`)
    .join('\n');

  const message = [
    'New Proteonix Order',
    '',
    `Products:\n${orderLines || '- N/A'}`,
    `Total: INR ${order.totalPrice}`,
    '',
    `Customer Name: ${order.name}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}, ${order.city} - ${order.pincode}`
  ].join('\n');

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
      to: WHATSAPP_NUMBER,
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
};

module.exports = { sendOrderNotification };
