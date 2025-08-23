const express = require("express");
const { askBot } = require("../services/chatbotService");

const router = express.Router();

// POST /api/chat
router.post("/", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const aiResponse = await askBot(userMessage);
    res.json({ reply: aiResponse });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Chatbot error" });
  }
});

module.exports = router;
