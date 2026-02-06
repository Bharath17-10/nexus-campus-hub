# 🚀 Nexus Campus Hub - Quick Setup Guide

## Step 1: Get Firebase Credentials (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Name it: `nexus-campus-hub` (or any name)
4. Disable Google Analytics (faster setup) → Click "Create project"
5. Once created, click the **Web icon** (</>) to add a web app
6. Register app name: `Nexus Campus Hub` → Click "Register app"
7. **Copy the firebaseConfig object** - you'll see something like:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123:web:abc..."
};
```

8. **Enable Authentication:**
   - In Firebase Console, go to **Build → Authentication**
   - Click "Get started"
   - Enable **Email/Password** (toggle it on)
   - Enable **Google** sign-in (toggle it on)

9. **Enable Firestore Database:**
   - Go to **Build → Firestore Database**
   - Click "Create database"
   - Start in **Test mode** (for hackathon) → Next
   - Choose location (closest to you) → Enable

10. **Enable Storage:**
    - Go to **Build → Storage**
    - Click "Get started"
    - Start in **Test mode** → Next → Done

---

## Step 2: Get Gemini API Key (1 minute)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Select your Firebase project (or create new one)
4. **Copy the API key** (starts with `AIza...`)

---

## Step 3: Update .env.local File

Open the file `u:\nexus-campus-hub\.env.local` and replace the placeholders:

```env
# Firebase Configuration (from Step 1)
VITE_FIREBASE_API_KEY=AIza... (your actual key)
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abc...

# Gemini AI Configuration (from Step 2)
VITE_GEMINI_API_KEY=AIza... (your Gemini API key)
```

---

## Step 4: Run the Application

```bash
npm run dev
```

Open browser to: http://localhost:5173

---

## 🎯 What Works Now:

✅ **Login/Signup** - Email/password + Google OAuth
✅ **Mail Summarizer** - Real Gemini AI email analysis
✅ **User Authentication** - Protected routes, logout
✅ **Firebase Integration** - Auth, Firestore, Storage ready

---

## 🚧 Still Building:

- Lost & Found with image recognition
- Mess menu AI recommendations
- Study schedule generator
- Real-time announcements

---

## 🆘 Troubleshooting:

**"Firebase: Error (auth/configuration-not-found)"**
→ Check that you copied ALL Firebase config values correctly

**"Gemini API key not found"**
→ Make sure .env.local has VITE_GEMINI_API_KEY set

**Build errors**
→ Run: `npm install` again

---

## 📝 Test Credentials (After Signup):

Create a test account:
- Email: test@college.edu
- Password: test123

Or use Google Sign-in!
