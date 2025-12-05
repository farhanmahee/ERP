"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.erpInsightFlow = void 0;
const core_1 = require("@genkit-ai/core");
const googleai_1 = require("@genkit-ai/googleai");
const zod_1 = require("zod");
const tools_1 = require("./tools");
(0, core_1.configureGenkit)({
    plugins: [
        (0, googleai_1.googleAI)({}),
    ],
    logLevel: 'debug',
    enableTracingAndMetrics: true,
});
exports.erpInsightFlow = (0, core_1.defineFlow)({
    name: 'erpInsightFlow',
    inputSchema: zod_1.z.object({
        tenantId: zod_1.z.string().describe('The ID of the tenant for data isolation'),
        message: zod_1.z.string().describe('The user\'s chat message'),
    }),
    outputSchema: zod_1.z.string().describe('The AI\'s final textual response'),
}, async (input) => {
    const { tenantId, message } = input;
    const systemInstruction = `
      You are an expert ERP Consultant for "Insight ERP", operating in Bangladesh.
      
      **Context & Constraints:**
      1. **Currency**: Always use Bangladeshi Taka (BDT or ৳).
      2. **Date Format**: DD/MM/YYYY.
      3. **Role**: Provide actionable business intelligence.
      4. **Capabilities**: You can access real-time database info via tools.
      
      **Objectives:**
      - Analyze inventory health (low stock, dead stock).
      - Forecast demand based on sales trends.
      - Suggest accounting optimizations (AR/AP analysis).
      
      If the user asks for recommendations, ALWAYS use the provided tools to get real data first.
      Do not make up data. If tools return empty, state that no data is found.
    `;
    const llmResponse = await (0, core_1.generate)({
        model: 'gemini-pro',
        prompt: message,
        system: systemInstruction,
        tools: [tools_1.fetchInventoryData, tools_1.analyzeSalesTrends],
    });
    return llmResponse.text();
});
//# sourceMappingURL=index.js.map