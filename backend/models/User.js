import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  personal_info: {
    fullname: {
      type: String,
      required: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    bio: {
      type: String,
      maxlength: 200,
      default: ""
    },
    profile_img: {
      type: String,
      default: ""
    }
  },
  social_links: {
    youtube: String,
    instagram: String,
    facebook: String,
    twitter: String,
    github: String,
    website: String
  },
  account_info: {
    total_posts: {
      type: Number,
      default: 0
    },
    total_reads: {
      type: Number,
      default: 0
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  },
  google_auth: {
    type: Boolean,
    default: false
  },
  blogs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'blogs',
    default: []
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('personal_info.password')) return next();
  this.personal_info.password = await bcrypt.hash(this.personal_info.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.personal_info.password);
};

export default mongoose.model('users', userSchema);

