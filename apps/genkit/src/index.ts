
import { configureGenkit, defineFlow, generate } from '@genkit-ai/core';
import { googleAI } from '@genkit-ai/google'; // Corrected import path
import { z } from 'zod';
import * as path from 'path';

// Import the tools we defined
import { fetchInventoryData, analyzeSalesTrends } from './tools';

// 1. Configure Genkit to use the Google AI plugin
configureGenkit({
  plugins: [
    googleAI({
      // The API key is automatically read from the GEMINI_API_KEY environment variable
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

// 2. Define the main ERP Insight Flow
export const erpInsightFlow = defineFlow(
  {
    name: 'erpInsightFlow',
    inputSchema: z.object({
      tenantId: z.string().describe('The ID of the tenant for data isolation'),
      message: z.string().describe('The user\'s chat message'),
    }),
    outputSchema: z.string().describe('The AI\'s final textual response'),
  },
  async (input) => {
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

    // 3. Call the Gemini model with the user message, system prompt, and tools.
    // Genkit handles the entire tool-calling loop automatically.
    const llmResponse = await generate({
      model: 'gemini-pro',
      prompt: message,
      system: systemInstruction,
      tools: [fetchInventoryData, analyzeSalesTrends],
      // Genkit automatically passes required inputs (like tenantId) to the tools.
      // We just need to ensure the tool's inputSchema matches what it needs.
      // Since both tools need `tenantId`, and our flow input has `tenantId`,
      // Genkit will automatically map it.
    });

    // 4. Return the final text response.
    return llmResponse.text();
  }
);
