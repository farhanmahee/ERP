"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateText = void 0;
const genai_1 = require("@google/genai");
const admin = require("firebase-admin");
const genAI = new genai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
}
const generateText = async (prompt) => {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};
exports.generateText = generateText;
//# sourceMappingURL=geminiService.js.map