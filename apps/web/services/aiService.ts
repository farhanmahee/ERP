import api from './api';

// No longer using client-side Gemini SDK directly.
// We send prompts to our secure backend which has database access.

export const generateERPAssistance = async (prompt: string, contextData?: string): Promise<string> => {
  try {
    const response = await api.post('/ai/chat', { message: prompt });
    return response.data.text;
  } catch (error) {
    console.error("AI Service Error:", error);
    return "I'm having trouble connecting to the server. Please check your internet connection.";
  }
};