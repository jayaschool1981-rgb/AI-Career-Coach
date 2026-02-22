const express = require("express");
const axios = require("axios");
const authMiddleware = require("../middleware/authMiddleware");
const Session = require("../models/Session");
const { buildPrompt } = require("../utils/aiPromptBuilder");

const router = express.Router();

router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const { role, skills, level } = req.body;

    if (!role || !skills || !level) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const prompt = buildPrompt(role, skills, level);

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    const aiText =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiText) {
      return res.status(500).json({ message: "AI returned empty response" });
    }

    res.json({
      success: true,
      role,
      level,
      result: aiText,
    });
  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);
    res.status(500).json({ message: "AI Generation Failed" });
  }
});

module.exports = router;