const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  const { message, room, guest } = req.body;
  if (!message || !room || !guest) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    const reply = chatResponse.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error.message);
    res.status(500).json({ error: "Failed to get response from AI." });
  }
};