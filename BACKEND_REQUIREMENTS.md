# Backend API Requirements for WeBlog

## Summary
Your frontend needs **TWO separate backend services**:

1. **Main API Server** - Handles blogs, users, comments, auth
2. **AI Models Service** - Handles AI features (summarize, paraphrase, title, predictor)

---

## 🔴 Main API Server Endpoints Needed:

### Authentication
- `POST /signup` - User registration
- `POST /signin` - User login  
- `POST /change-password` - Change password

### User Profile
- `POST /get-profile` - Get user profile
- `POST /update-profile` - Update profile info
- `POST /update-profile-img` - Update profile image

### Blogs
- `POST /latest-blogs` - Get latest blog posts (with pagination)
- `GET /trending-blogs` - Get trending blogs
- `POST /search-blogs` - Search blogs by query or tag
- `POST /get-blog` - Get single blog post
- `POST /create-blog` - Create new blog
- `POST /delete-blog` - Delete blog
- `POST /user-written-blogs` - Get user's blogs (with pagination)
- `POST /all-latest-blogs-count` - Get count of latest blogs
- `POST /user-written-blogs-count` - Get count of user blogs

### Comments
- `POST /add-comment` - Add comment to blog
- `POST /delete-comment` - Delete comment
- `POST /get-blog-comments` - Get blog comments (with pagination)
- `POST /get-replies` - Get comment replies (with pagination)

### Interactions
- `POST /like-blog` - Like/unlike blog
- `POST /isliked-by-user` - Check if user liked

### Notifications
- `GET /new-notification` - Check for new notifications
- `POST /notifications` - Get notifications (with pagination)

### Users
- `POST /search-users` - Search users

### Storage
- `GET /get-upload-url` - Get S3/AWS upload URL for images

---

## 🤖 AI Models Service Endpoints Needed:

- `POST /summarize` - AI blog summary
- `POST /title` - AI title generation  
- `POST /paraphrase` - AI paraphrasing
- `POST /predictor` - AI smart suggestions

---

## 🔑 Environment Variables Needed:

### Main API Server (.env)
```
MONGO_URI=mongodb+srv://webblog:tcgPb8JyARfD3qRJ@cluster0.aj1c1p8.mongodb.net/?appName=Cluster0
JWT_SECRET=<your_secret>
PORT=5000
```

### AI Service (.env)
```
GOOGLE_AI_API_KEY=AIzaSyB7gxyp2cCvkS_BACeXnIoXmzJmIhTaD8c
```

---

## 🚀 Deployment Strategy:

### Option 1: Find Original Backend (Best)
- Ask freelancer for backend code
- Or use the deployed backend from weblognow.vercel.app if it's publicly accessible

### Option 2: Build from Scratch (Complex)
I would need to build:
- Complete REST API with Express.js
- MongoDB models and schemas
- JWT authentication
- AWS S3 integration for images
- Google Gemini AI integration
- All the endpoints above

**This would take a lot of code and time!**

### Option 3: Temporary Test Deploy
Deploy frontend only to show the UI (features won't work without backend)

---

## 📊 Current Status:
- ✅ Frontend code: Complete
- ✅ MongoDB: Configured
- ✅ Google API Key: Provided
- ❌ Backend API: MISSING
- ❌ AI Service: MISSING

## ⚠️ Next Steps:
**You MUST get the backend code from your freelancer!**

Without it, the website cannot work. This is critical.

---

**Would you like me to:**
1. Try to contact/ask freelancer for backend?
2. Build a basic backend (will take significant time)?
3. Just deploy frontend to show UI?

Let me know!

