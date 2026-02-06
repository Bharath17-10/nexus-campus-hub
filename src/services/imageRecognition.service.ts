import { getVisionModel } from '@/lib/gemini.config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase.config';

/**
 * Analyze image and extract object tags using Gemini Vision API
 */
export const analyzeImage = async (imageFile: File): Promise<{ tags: string[]; description: string }> => {
    try {
        const model = getVisionModel();

        // Convert image to base64
        const imageData = await fileToGenerativePart(imageFile);

        const prompt = `Analyze this image and provide:
1. A list of objects/items visible in the image (comma-separated)
2. A brief description of the image

Respond in JSON format:
{
  "tags": ["tag1", "tag2", "tag3"],
  "description": "brief description"
}`;

        const result = await model.generateContent([prompt, imageData]);
        const response = await result.response;
        const text = response.text();

        // Parse JSON response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return {
                tags: parsed.tags || [],
                description: parsed.description || 'Image uploaded',
            };
        }

        // Fallback
        return {
            tags: ['item', 'object'],
            description: 'Image uploaded successfully',
        };
    } catch (error) {
        console.error('Error analyzing image:', error);
        return {
            tags: ['item'],
            description: 'Image uploaded',
        };
    }
};

/**
 * Upload image to Firebase Storage
 */
export const uploadImage = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

/**
 * Helper function to convert File to GenerativePart
 */
async function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string } }> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = (reader.result as string).split(',')[1];
            resolve({
                inlineData: {
                    data: base64Data,
                    mimeType: file.type,
                },
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
