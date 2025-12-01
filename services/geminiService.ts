import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// NOTE: Accessing API_KEY from process.env as per strict guidelines.
const apiKey = process.env.API_KEY || ''; 

let genAI: GoogleGenAI | null = null;

if (apiKey) {
  genAI = new GoogleGenAI({ apiKey: apiKey });
}

export const generateERPAssistance = async (prompt: string, contextData: string): Promise<string> => {
  if (!genAI) {
    return "API Key is missing. Please configure process.env.API_KEY.";
  }

  try {
    // Using the specific model requested for complex text tasks
    const response: GenerateContentResponse = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert ERP System Assistant. 
      Your goal is to help users manage Inventory (Cylinders, General Items), Sales, Purchase, Accounting, and HR.
      
      Context of current system data:
      ${contextData}
      
      User Query:
      ${prompt}
      
      Guidelines:
      - If asked about stock, refer to "In-House", "Customer Held", or "In-Transit".
      - If asked about finance, refer to receivables or payables.
      - Be professional and concise.`,
      config: {
        systemInstruction: "You are a helpful ERP assistant for a Gas Cylinder business.",
      }
    });
    
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error processing your request.";
  }
};