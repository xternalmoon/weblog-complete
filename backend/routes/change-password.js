import express from 'express';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Change password
router.post('/change-password', verifyToken, async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!await user.comparePassword(current_password)) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    user.personal_info.password = new_password;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

