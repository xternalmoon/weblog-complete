import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get profile
router.post('/get-profile', async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ 'personal_info.username': username })
      .select('-personal_info.password')
      .select('-google_auth');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update profile
router.post('/update-profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { bio, social_links } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        'personal_info.bio': bio || '',
        social_links: social_links || {}
      },
      { new: true }
    ).select('-personal_info.password').select('-google_auth');

    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update profile image
router.post('/update-profile-img', verifyToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const { url } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { 'personal_info.profile_img': url },
      { new: true }
    ).select('-personal_info.password').select('-google_auth');

    res.json({ profile_img: user.personal_info.profile_img });
  } catch (error) {
    console.error('Update profile img error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search users
router.post('/search-users', async (req, res) => {
  try {
    const { query } = req.body;
    const users = await User.find({
      'personal_info.username': new RegExp(query, 'i')
    })
      .select('personal_info.fullname personal_info.username personal_info.profile_img')
      .limit(50);

    res.json({ users });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

