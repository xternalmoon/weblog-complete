import express from 'express';
import User from '../models/User.js';
import { generateToken, verifyToken } from '../middleware/auth.js';
import Joi from 'joi';

const router = express.Router();

// Validation schemas
const signupSchema = Joi.object({
  fullname: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8),
  username: Joi.string().alphanum().required().min(3).max(30)
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { fullname, email, password, username } = value;

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ 'personal_info.email': email }, { 'personal_info.username': username }]
    });

    if (existingUser) {
      if (existingUser.personal_info.email === email) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Create new user
    const user = new User({
      personal_info: {
        fullname,
        email,
        password,
        username
      }
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      access_token: token,
      profile_img: user.personal_info.profile_img,
      username: user.personal_info.username,
      fullname: user.personal_info.fullname
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Signin
router.post('/signin', async (req, res) => {
  try {
    const { error, value } = signinSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;

    const user = await User.findOne({ 'personal_info.email': email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      access_token: token,
      profile_img: user.personal_info.profile_img,
      username: user.personal_info.username,
      fullname: user.personal_info.fullname
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

