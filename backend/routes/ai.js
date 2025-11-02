import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { verifyToken } from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for AI endpoints
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // 3 requests per minute as per README
  message: { error: 'Rate limit exceeded. Maximum 3 AI requests per minute.' }
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || 'AIzaSyB7gxyp2cCvkS_BACeXnIoXmzJmIhTaD8c');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Summarize
router.post('/summarize', aiLimiter, verifyToken, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 100) {
      return res.status(400).json({ error: 'Text must be at least 100 characters' });
    }

    const prompt = `Provide a comprehensive summary of the following blog post. Make it detailed and capture all key points:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    res.json({ summary });
  } catch (error) {
    console.error('Summarize error:', error);
    res.status(500).json({ error: 'AI service error. Please try again.' });
  }
});

// Generate title
router.post('/title', aiLimiter, verifyToken, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ error: 'Text must be at least 50 characters' });
    }

    const prompt = `Generate an engaging, catchy title for this blog post content. Make it compelling and SEO-friendly:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const title = result.response.text().replace(/['"]/g, '').trim();

    res.json({ title });
  } catch (error) {
    console.error('Title generation error:', error);
    res.status(500).json({ error: 'AI service error. Please try again.' });
  }
});

// Paraphrase
router.post('/paraphrase', aiLimiter, verifyToken, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 20) {
      return res.status(400).json({ error: 'Text must be at least 20 characters' });
    }

    const prompt = `Rephrase the following text while keeping the same meaning. Make it more engaging and clear:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const paraphrased = result.response.text();

    res.json({ paraphrased });
  } catch (error) {
    console.error('Paraphrase error:', error);
    res.status(500).json({ error: 'AI service error. Please try again.' });
  }
});

// Smart suggestions (predictor)
router.post('/predictor', aiLimiter, verifyToken, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ error: 'Text must be at least 50 characters' });
    }

    const prompt = `Based on this blog post content, provide smart writing suggestions and ideas to improve it. Give 3-5 actionable suggestions:\n\n${text}`;

    const result = await model.generateContent(prompt);
    const suggestions = result.response.text();

    res.json({ suggestions });
  } catch (error) {
    console.error('Predictor error:', error);
    res.status(500).json({ error: 'AI service error. Please try again.' });
  }
});

export default router;

