import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  blog_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'blogs'
  },
  blog_author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  children: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'comments',
    default: []
  },
  commented_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  isReply: {
    type: Boolean,
    default: false
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'comments',
    default: null
  },
  commentedAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

export default mongoose.model('comments', commentSchema);

