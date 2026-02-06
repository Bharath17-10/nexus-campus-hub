import { getTextModel } from '@/lib/gemini.config';

export interface EmailSummaryResult {
    summary: string;
    category: 'Academic' | 'Event' | 'Urgent' | 'General';
    priority: 'High' | 'Medium' | 'Low';
    actionItems?: string[];
}

/**
 * Summarize email content using Gemini AI
 */
export const summarizeEmail = async (emailContent: string): Promise<EmailSummaryResult> => {
    try {
        const model = getTextModel();

        const prompt = `You are an AI assistant helping college students manage their emails. 
Analyze the following email and provide:
1. A concise summary (1-2 sentences)
2. Category: Academic, Event, Urgent, or General
3. Priority: High, Medium, or Low
4. Action items (if any)

Email content:
${emailContent}

Respond in JSON format:
{
  "summary": "brief summary here",
  "category": "Academic|Event|Urgent|General",
  "priority": "High|Medium|Low",
  "actionItems": ["action 1", "action 2"]
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse JSON response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                summary: parsed.summary || 'Unable to generate summary',
                category: parsed.category || 'General',
                priority: parsed.priority || 'Medium',
                actionItems: parsed.actionItems || [],
            };
        }

        // Fallback if JSON parsing fails
        return {
            summary: text.substring(0, 200),
            category: 'General',
            priority: 'Medium',
        };
    } catch (error) {
        console.error('Error summarizing email:', error);
        throw new Error('Failed to summarize email. Please try again.');
    }
};

/**
 * Get meal recommendations based on user preferences and time
 */
export const getMealRecommendations = async (
    mealType: 'breakfast' | 'lunch' | 'dinner',
    userPreferences?: {
        dietary?: string[];
        favorites?: string[];
        allergies?: string[];
    }
): Promise<{ recommendation: string; reason: string }> => {
    try {
        const model = getTextModel();

        const prompt = `You are a nutritionist AI helping college students choose healthy meals.
Meal type: ${mealType}
User preferences: ${JSON.stringify(userPreferences || {})}

Provide a brief recommendation (1-2 sentences) and reason for the suggestion.

Respond in JSON format:
{
  "recommendation": "recommendation text",
  "reason": "reason for recommendation"
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return {
            recommendation: 'Choose balanced meals with protein and vegetables',
            reason: 'Maintains energy throughout the day',
        };
    } catch (error) {
        console.error('Error getting meal recommendations:', error);
        return {
            recommendation: 'Choose what looks fresh and appealing',
            reason: 'Enjoy your meal!',
        };
    }
};

/**
 * Generate study schedule based on subjects and exam dates
 */
export const generateStudySchedule = async (
    subjects: string[],
    examDates?: Record<string, string>
): Promise<{ schedule: string; tips: string[] }> => {
    try {
        const model = getTextModel();

        const prompt = `You are an academic advisor AI helping students create study schedules.
Subjects: ${subjects.join(', ')}
Exam dates: ${JSON.stringify(examDates || {})}

Create a study schedule and provide 3-5 study tips.

Respond in JSON format:
{
  "schedule": "detailed schedule text",
  "tips": ["tip 1", "tip 2", "tip 3"]
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return {
            schedule: 'Study each subject for 2 hours daily with breaks',
            tips: ['Take regular breaks', 'Stay hydrated', 'Review notes daily'],
        };
    } catch (error) {
        console.error('Error generating study schedule:', error);
        throw new Error('Failed to generate study schedule');
    }
};
