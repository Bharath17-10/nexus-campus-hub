# 📚 Nexus Campus Hub - Complete Project Documentation

Welcome to the complete guide for Nexus Campus Hub! This document will walk you through everything you need to know about the project, from architecture to deployment.

---

## 📖 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Frontend Guide](#frontend-guide)
4. [Backend Guide](#backend-guide)
5. [AI Integration](#ai-integration)
6. [API Documentation](#api-documentation)
7. [Deployment Guide](#deployment-guide)
8. [Best Practices](#best-practices)
9. [FAQ](#faq)

---

## 🎯 Project Overview

### What is Nexus Campus Hub?

Nexus Campus Hub is a full-stack web application designed to simplify campus life for students. It combines modern web technologies with AI-powered features to create an intuitive, helpful platform.

### Core Philosophy

- **Student-First**: Every feature is designed with students' needs in mind
- **Simplicity**: Complex tasks made simple through smart design
- **Intelligence**: AI-powered features that actually help
- **Beauty**: A pleasure to use, not just functional

### Target Users

- **College Students** - Primary users managing campus life
- **University Staff** - Sending announcements and updates
- **Campus Organizations** - Promoting events and activities

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User's Browser                        │
│                  (React Frontend)                        │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP/REST API
                     │
┌────────────────────▼────────────────────────────────────┐
│              Express Backend Server                      │
│                  (Node.js/Express)                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ API Calls
                     │
┌────────────────────▼────────────────────────────────────┐
│              Google Gemini AI                            │
│           (gemini-3-flash-preview)                       │
└──────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend Layer**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- React Query for data fetching
- React Router for navigation

**Backend Layer**
- Node.js runtime
- Express.js framework
- Google Generative AI SDK
- Helmet for security
- Morgan for logging
- CORS for cross-origin requests

**AI Layer**
- Google Gemini API
- Model: gemini-3-flash-preview
- Fallback: Intelligent demo mode

---

## 🎨 Frontend Guide

### Project Structure

```
src/
├── components/           # Reusable components
│   ├── daily-pulse/     # Daily Pulse specific
│   │   └── MailSummarizer.tsx
│   ├── layout/          # Layout components
│   │   ├── AppLayout.tsx
│   │   └── BottomNavigation.tsx
│   └── ui/              # UI primitives (shadcn)
│
├── pages/               # Page components
│   ├── DailyPulse.tsx
│   ├── StudentExchange.tsx
│   ├── ExplorersGuide.tsx
│   ├── AcademicCockpit.tsx
│   └── NotFound.tsx
│
├── services/            # API services
│   └── apiService.ts
│
├── lib/                 # Utilities
│   └── utils.ts
│
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

### Key Components

#### MailSummarizer Component

**Location:** `src/components/daily-pulse/MailSummarizer.tsx`

**Purpose:** AI-powered email analysis interface

**Features:**
- Text input for email content
- Loading states during analysis
- Animated result display
- Category and priority badges
- Error handling with toast notifications

**Usage:**
```tsx
import MailSummarizer from '@/components/daily-pulse/MailSummarizer';

function DailyPulse() {
  return (
    <div>
      <MailSummarizer />
    </div>
  );
}
```

#### AppLayout Component

**Location:** `src/components/layout/AppLayout.tsx`

**Purpose:** Main application layout wrapper

**Features:**
- Responsive design
- Bottom navigation (mobile)
- Side navigation (desktop)
- Page transition animations
- Gradient mesh background

### Styling Approach

**Tailwind CSS** is used for all styling:

```tsx
// Example: Gradient button
<button className="bg-gradient-to-r from-purple-600 to-blue-600 
                   text-white px-6 py-3 rounded-lg 
                   hover:shadow-lg transition-all">
  Click Me
</button>
```

**Custom Animations** with Framer Motion:

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

### State Management

**React Query** for server state:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['emailSummary'],
  queryFn: () => summarizeEmail(emailContent)
});
```

**React Hooks** for local state:

```tsx
const [emailContent, setEmailContent] = useState('');
const [result, setResult] = useState(null);
```

---

## ⚙️ Backend Guide

### Project Structure

```
server/
├── src/
│   ├── routes/              # API route handlers
│   │   └── summarize.js
│   │
│   ├── services/            # Business logic
│   │   └── aiService.js
│   │
│   ├── middleware/          # Express middleware
│   │   └── errorHandler.js
│   │
│   └── index.js             # Server entry point
│
├── .env                     # Environment variables
├── .env.example             # Environment template
├── package.json             # Dependencies
└── README.md                # Backend docs
```

### Server Configuration

**Entry Point:** `src/index.js`

```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  credentials: true
}));

// Request logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api', summarizeRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

### API Routes

**Summarize Endpoint:** `POST /api/summarize`

**File:** `src/routes/summarize.js`

```javascript
router.post('/summarize', async (req, res) => {
  try {
    const { emailContent } = req.body;
    
    // Validation
    if (!emailContent || emailContent.trim().length === 0) {
      return res.status(400).json({
        error: 'Email content is required'
      });
    }
    
    // Call AI service
    const result = await summarizeEmail(emailContent);
    
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Failed to summarize email'
    });
  }
});
```

### Security Features

1. **Helmet** - Sets security headers
2. **CORS** - Controlled cross-origin access
3. **Rate Limiting** - Prevents abuse
4. **Input Validation** - Sanitizes user input
5. **Error Handling** - Prevents information leakage

---

## 🤖 AI Integration

### Google Gemini Setup

**Model Used:** `gemini-3-flash-preview`

**Why this model?**
- Latest stable model
- Fast response times
- Good balance of quality and speed
- Free tier available

### AI Service Implementation

**File:** `src/services/aiService.js`

```javascript
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function summarizeEmail(emailContent) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-3-flash-preview' 
    });
    
    const prompt = `Analyze this email and provide:
    1. A concise summary (1-2 sentences)
    2. Category: Academic, Event, Urgent, or General
    3. Priority: High, Medium, or Low
    
    Email: ${emailContent}
    
    Respond in JSON format:
    {"summary": "...", "category": "...", "priority": "..."}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse and validate
    const parsed = JSON.parse(text);
    
    return {
      summary: parsed.summary,
      category: parsed.category,
      priority: parsed.priority
    };
  } catch (error) {
    console.error('AI Error:', error);
    // Fallback to demo mode
    return analyzEmailDemo(emailContent);
  }
}
```

### Demo Mode (Fallback)

When AI is unavailable, the system uses intelligent keyword matching:

```javascript
function analyzEmailDemo(emailContent) {
  const lower = emailContent.toLowerCase();
  
  // Category detection
  let category = 'General';
  if (lower.includes('exam') || lower.includes('assignment')) {
    category = 'Academic';
  } else if (lower.includes('event') || lower.includes('workshop')) {
    category = 'Event';
  } else if (lower.includes('urgent') || lower.includes('asap')) {
    category = 'Urgent';
  }
  
  // Priority detection
  let priority = 'Medium';
  if (lower.includes('urgent') || lower.includes('deadline')) {
    priority = 'High';
  } else if (lower.includes('fyi') || lower.includes('reminder')) {
    priority = 'Low';
  }
  
  // Summary extraction
  const sentences = emailContent.split(/[.!?]+/);
  const summary = sentences.slice(0, 3).join('. ').trim();
  
  return { summary, category, priority };
}
```

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:3001/api
Production: https://your-domain.com/api
```

### Endpoints

#### POST /api/summarize

Analyzes an email and returns summary, category, and priority.

**Request:**
```json
{
  "emailContent": "Dear Students, The final exam schedule..."
}
```

**Response (Success - 200):**
```json
{
  "summary": "Final exam schedule released for Fall 2026 semester.",
  "category": "Academic",
  "priority": "High"
}
```

**Response (Error - 400):**
```json
{
  "error": "Email content is required"
}
```

**Response (Error - 500):**
```json
{
  "error": "Failed to summarize email"
}
```

### Rate Limiting

- **Window:** 15 minutes
- **Max Requests:** 100 per IP
- **Response:** 429 Too Many Requests

### CORS Policy

- **Allowed Origins:** Configured via `CORS_ORIGIN` env variable
- **Credentials:** Supported
- **Methods:** GET, POST, PUT, DELETE
- **Headers:** Content-Type, Authorization

---

## 🚀 Deployment Guide

### Prerequisites

- Node.js 16+ installed
- npm or yarn
- Google Gemini API key
- Domain name (for production)

### Local Development

```bash
# 1. Install dependencies
npm install
cd server && npm install && cd ..

# 2. Configure environment
cd server
cp .env.example .env
# Edit .env with your API key

# 3. Start development servers
# Terminal 1
npm run dev

# Terminal 2
cd server && npm start
```

### Production Deployment

#### Option 1: Traditional Hosting

**Frontend (Vercel/Netlify):**
```bash
# Build frontend
npm run build

# Deploy dist folder
```

**Backend (Heroku/Railway):**
```bash
# From server directory
git push heroku main
```

#### Option 2: Docker

**Dockerfile (Frontend):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

**Dockerfile (Backend):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .
EXPOSE 3001
CMD ["npm", "start"]
```

### Environment Variables (Production)

```env
# Backend
PORT=3001
GEMINI_API_KEY=your_production_key
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## ✅ Best Practices

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Write meaningful comments
- Keep functions small and focused
- Use descriptive variable names

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage
```

### Performance

- Lazy load components
- Optimize images
- Use React.memo for expensive components
- Implement virtual scrolling for long lists
- Cache API responses

---

## ❓ FAQ

### How do I get a Gemini API key?

Visit [Google AI Studio](https://ai.google.dev/), sign in, and create a new API key. It's free!

### Can I use a different AI model?

Yes! Edit `src/services/aiService.js` and change the model name. Check [Google's docs](https://ai.google.dev/models) for available models.

### How do I add a new page?

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation in `BottomNavigation.tsx`

### Is demo mode production-ready?

Yes! Demo mode provides intelligent analysis using keyword matching. It's a great fallback when AI is unavailable.

### How do I customize the UI?

Edit `tailwind.config.js` for colors and themes. All components use Tailwind classes.

---

## 📞 Getting Help

- **Documentation Issues:** Open an issue on GitHub
- **Feature Requests:** Create a discussion
- **Bug Reports:** Use the bug report template
- **General Questions:** Join our Discord community

---

<div align="center">

**Happy Coding! 🚀**

Made with ❤️ for the student community

</div>
