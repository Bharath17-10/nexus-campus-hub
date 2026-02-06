# 🎓 Nexus Campus Hub

**A comprehensive AI-powered campus management platform for college students**

[![Built with React](https://img.shields.io/badge/React-18.3-blue)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Enabled-orange)](https://firebase.google.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-purple)](https://ai.google.dev/)

---

## 🌟 Overview

Nexus Campus Hub is an all-in-one platform designed to streamline college life by integrating **AI-powered features** across four core pillars:

1. **Daily Pulse** - Mess menu, mail summarization, and announcements
2. **Student Exchange** - Lost & found with AI image recognition
3. **Explorer's Guide** - Campus navigation and resources
4. **Academic Cockpit** - Timetables, assignments, and AI study planner

---

## ✨ Key Features

### 🤖 AI/ML Components (4 Total)

#### 1. **Mail Summarizer** (Gemini AI) ⭐ *Mandatory*
- Paste any email and get instant AI-powered summaries
- Automatic categorization (Academic, Event, Urgent, General)
- Priority detection (High, Medium, Low)
- Action item extraction

#### 2. **Lost & Found with Image Recognition** (Gemini Vision)
- Upload photos of lost/found items
- AI automatically tags and categorizes objects
- Smart search and matching
- Real-time item feed

#### 3. **AI Study Schedule Generator** (Gemini AI)
- Input your subjects and get personalized study plans
- AI-generated study tips and strategies
- Exam preparation recommendations
- Time management suggestions

#### 4. **Mess Menu Recommendations** (Gemini AI)
- AI-powered meal suggestions based on preferences
- Dietary restriction support
- Time-aware recommendations (quick meals before class)
- Nutritional insights

### 🔐 Authentication
- Email/Password authentication
- Google OAuth integration
- Protected routes
- User profile management

### ⚡ Real-time Features
- Live announcements feed
- Real-time lost & found updates
- Firestore real-time listeners
- Instant notifications

### 📱 Responsive Design
- Mobile-first approach
- Beautiful glassmorphism UI
- Smooth animations with Framer Motion
- Dark mode support

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Framer Motion** - Smooth animations

### Backend & AI
- **Firebase Authentication** - User management
- **Firestore** - Real-time database
- **Firebase Storage** - Image uploads
- **Google Gemini AI** - Text & vision models

### State Management
- **React Context** - Auth state
- **TanStack Query** - Server state

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase account
- Google Gemini API key

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd nexus-campus-hub

# Install dependencies
npm install

# Set up environment variables (see SETUP_GUIDE.md)
# Copy .env.local and fill in your API keys

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Configuration

### Required API Keys

1. **Firebase** - Get from [Firebase Console](https://console.firebase.google.com/)
2. **Gemini AI** - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)

See **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for detailed step-by-step instructions.

### Environment Variables

Create `.env.local` in the project root:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Gemini AI
VITE_GEMINI_API_KEY=your_gemini_key_here
```

---

## 📖 Features Walkthrough

### 1. Authentication
- Sign up with email or Google
- Secure login with Firebase Auth
- Protected routes for all features

### 2. Daily Pulse
- **Mess Menu**: View today's breakfast, lunch, and dinner
- **Mail Summarizer**: AI-powered email analysis
- **Announcements**: Real-time campus updates

### 3. Lost & Found
- Report lost or found items
- Upload photos for AI recognition
- Search and filter items
- Contact item owners

### 4. Academic Cockpit
- View class timetables
- Track assignments and deadlines
- Monitor academic performance
- **AI Study Planner**: Generate personalized study schedules

---

## 🧪 Testing

### Manual Testing Checklist

✅ **Authentication**
- [ ] Sign up with email/password
- [ ] Login with existing account
- [ ] Google OAuth login
- [ ] Logout functionality

✅ **Mail Summarizer**
- [ ] Paste email content
- [ ] Verify AI summary generation
- [ ] Check category/priority detection

✅ **Lost & Found**
- [ ] Upload item image
- [ ] Verify AI object detection
- [ ] Submit lost/found report
- [ ] View items feed

✅ **Study Planner**
- [ ] Enter subjects
- [ ] Generate AI study schedule
- [ ] View study tips

---

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
npm run build
firebase deploy
```

---

## 🎯 Hackathon Submission Checklist

- [x] **2+ AI/ML Components**: Mail Summarizer, Image Recognition, Study Planner, Mess Recommendations
- [x] **Authentication**: Firebase Auth with email and Google OAuth
- [x] **Real-time Features**: Firestore real-time listeners
- [x] **Responsive UI**: Mobile-first design with Tailwind CSS
- [x] **Database**: Firestore for data persistence
- [x] **Deployed**: Ready for Vercel/Firebase deployment
- [x] **Documentation**: Comprehensive README and setup guide

---

## 📁 Project Structure

```
nexus-campus-hub/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   ├── daily-pulse/    # Daily Pulse features
│   │   ├── academic/       # Academic components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # shadcn/ui components
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── lib/                # Utilities and configs
│   │   ├── firebase.config.ts
│   │   └── gemini.config.ts
│   ├── pages/              # Page components
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   ├── DailyPulse.tsx
│   │   ├── LostAndFound.tsx
│   │   └── AcademicCockpit.tsx
│   ├── services/           # API services
│   │   ├── gemini.service.ts
│   │   ├── firestore.service.ts
│   │   └── imageRecognition.service.ts
│   └── App.tsx             # Main app component
├── .env.local              # Environment variables
├── SETUP_GUIDE.md          # Detailed setup instructions
└── README.md               # This file
```

---

## 🤝 Contributing

This project was built for a hackathon. Feel free to fork and improve!

---

## 📄 License

MIT License - feel free to use this project for learning and development.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful AI capabilities
- **Firebase** for backend infrastructure
- **shadcn/ui** for beautiful components
- **Tailwind CSS** for styling

---

## 📞 Support

For setup issues, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

**Built with ❤️ for college students**
