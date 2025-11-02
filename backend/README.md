# WeBlog Backend API

Complete backend API server for WeBlog platform built with Node.js, Express, and MongoDB.

## Features

- ✅ User Authentication (Signup, Signin with JWT)
- ✅ User Profile Management
- ✅ Blog CRUD Operations
- ✅ Comments & Replies
- ✅ Likes & Interactions
- ✅ Notifications System
- ✅ AI Features (Powered by Google Gemini)
  - Smart Summary
  - Title Generation
  - Paraphrasing
  - Smart Suggestions
- ✅ Search Functionality
- ✅ Image Upload Support

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (or copy from `.env.example`):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your-secret-key
GOOGLE_AI_API_KEY=your-google-ai-key
```

3. Run the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /signup` - Register new user
- `POST /signin` - Login user

### Blogs
- `POST /latest-blogs` - Get latest blog posts
- `POST /search-blogs` - Search blogs
- `GET /trending-blogs` - Get trending blogs
- `POST /get-blog` - Get single blog
- `POST /create-blog` - Create/update blog
- `POST /delete-blog` - Delete blog
- `POST /user-written-blogs` - Get user's blogs
- `POST /like-blog` - Like a blog
- `POST /isliked-by-user` - Check if liked

### Comments
- `POST /add-comment` - Add comment
- `POST /get-blog-comments` - Get blog comments
- `POST /get-replies` - Get comment replies
- `POST /delete-comment` - Delete comment

### Users
- `POST /get-profile` - Get user profile
- `POST /update-profile` - Update profile
- `POST /update-profile-img` - Update profile image
- `POST /search-users` - Search users
- `POST /change-password` - Change password

### AI Services
- `POST /summarize` - Generate summary
- `POST /title` - Generate title
- `POST /paraphrase` - Paraphrase text
- `POST /predictor` - Get suggestions

### Other
- `GET /get-upload-url` - Get image upload URL
- `GET /new-notification` - Check new notifications
- `POST /notifications` - Get notifications

## Rate Limits

- General API: 100 requests per 15 minutes
- AI Endpoints: 3 requests per minute (as per WeBlog requirements)

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Google Generative AI** - AI features
- **bcryptjs** - Password hashing

## Production Deployment

This backend is ready to deploy to:
- **Render.com** (Recommended)
- **Heroku**
- **Railway**
- **AWS EC2**
- **DigitalOcean**

Set environment variables in your hosting platform!

## License

ISC

