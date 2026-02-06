import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env.local file');
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY || '');

// Get the generative model for text
export const getTextModel = () => {
    return genAI.getGenerativeModel({ model: 'gemini-pro' });
};

// Get the generative model for vision (images)
export const getVisionModel = () => {
    return genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
};

export default genAI;
