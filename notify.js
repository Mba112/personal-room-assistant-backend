const axios = require("axios");

module.exports = async (req, res) => {
  const { guest, room, message, type } = req.body;
  if (!guest || !room || !message) {
    return res.status(400).json({ error: "Missing guest, room, or message." });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  const text = `🛎️ *New Guest Request*\n👤 Name: *${guest}*\n🏨 Room: *${room}*\n📋 Type: ${type || 'general'}\n💬 Message: _${message}_\n🕒 Time: ${new Date().toLocaleString()}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: "Markdown"
    });

    res.json({ message: "Notification sent to Telegram." });
  } catch (error) {
    console.error("Telegram error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to send Telegram message." });
  }
};