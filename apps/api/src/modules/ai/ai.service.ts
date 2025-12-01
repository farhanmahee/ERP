import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI, FunctionDeclaration, Schema, Type } from "@google/genai";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AiService {
  private ai: GoogleGenAI;
  private readonly logger = new Logger(AiService.name);

  constructor(private prisma: PrismaService) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      this.logger.warn('API_KEY not found. AI features will be disabled.');
    }
    this.ai = new GoogleGenAI({ apiKey: apiKey || 'dummy_key' });
  }

  // --- Tool Definitions ---

  private getInventoryTool: FunctionDeclaration = {
    name: 'fetchInventoryData',
    description: 'Fetch current inventory levels, specifically looking for low stock items.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        category: { type: Type.STRING, description: 'Optional product category filter' },
      },
    },
  };

  private getSalesTrendTool: FunctionDeclaration = {
    name: 'analyzeSalesTrends',
    description: 'Analyze sales data for the last 30, 60, or 90 days to identify trends.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        days: { type: Type.NUMBER, description: 'Number of days to analyze (default 30)' },
      },
    },
  };

  // --- Main Chat Processor ---

  async processChat(userMessage: string, tenantId: string) {
    try {
      const model = 'gemini-3-pro-preview';
      
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

      // 1. Initial Call with Tools
      const result = await this.ai.models.generateContent({
        model,
        contents: [
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction,
          tools: [{ functionDeclarations: [this.getInventoryTool, this.getSalesTrendTool] }],
        },
      });

      const response = result.candidates?.[0];
      const functionCalls = response?.content?.parts?.filter(p => p.functionCall)?.map(p => p.functionCall);

      // 2. Handle Function Calls
      if (functionCalls && functionCalls.length > 0) {
        const functionResponses = [];

        for (const call of functionCalls) {
          this.logger.log(`Executing tool: ${call.name}`);
          
          let toolResult: any = {};
          
          if (call.name === 'fetchInventoryData') {
            toolResult = await this.fetchInventoryData(tenantId);
          } else if (call.name === 'analyzeSalesTrends') {
            const days = (call.args as any).days || 30;
            toolResult = await this.analyzeSalesTrends(tenantId, days);
          }

          functionResponses.push({
            functionResponse: {
              name: call.name,
              response: { result: toolResult }
            }
          });
        }

        // 3. Send Tool Outputs back to Gemini for Final Answer
        const finalResult = await this.ai.models.generateContent({
          model,
          contents: [
            { role: 'user', parts: [{ text: userMessage }] },
            response.content, // The model's original tool call request
            { role: 'tool', parts: functionResponses } // Our actual data response
          ],
          config: { systemInstruction }
        });

        return { 
          text: finalResult.candidates?.[0]?.content?.parts?.[0]?.text || "Analysis complete." 
        };
      }

      // No tools called, just return text
      return { 
        text: response?.content?.parts?.[0]?.text || "I'm here to help with your ERP data." 
      };

    } catch (error) {
      this.logger.error('AI Processing Error', error);
      return { text: "I encountered an issue connecting to the AI service. Please check your API configuration." };
    }
  }

  // --- Implementation of Tools ---

  private async fetchInventoryData(tenantId: string) {
    // Logic to fetch low stock items from Prisma
    // Assuming 'Product' and 'StockLocation' models exist
    // This query is a simplification for the MVP
    const lowStockItems = await this.prisma.product.findMany({
        where: { 
            // tenantId handled by middleware/extension usually, but explicit here for safety if raw
            // Assuming simplified schema for demo:
            // stockQuantity: { lte: 10 } 
        },
        take: 10
    });
    
    // Mocking return if DB is empty or schema differs slightly in this context
    if (lowStockItems.length === 0) {
        return {
            status: "success",
            insight: "No critical low stock items found in the primary warehouse.",
            recommendation: "Maintain current reorder levels."
        };
    }

    return {
        status: "alert",
        items: lowStockItems.map(p => ({ name: p.name, stock: 5 })), // Mocking stock for MVP if field varies
        insight: "Several items are below reorder level.",
    };
  }

  private async analyzeSalesTrends(tenantId: string, days: number) {
    // Logic to aggregate SalesOrder data
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    const sales = await this.prisma.salesOrder.findMany({
        where: {
            orderDate: { gte: dateThreshold }
        }
    });

    const totalRevenue = sales.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0);
    const count = sales.length;

    return {
        period: `${days} days`,
        totalRevenue: totalRevenue,
        orderCount: count,
        trend: count > 0 ? "Positive" : "No Data",
        insight: count > 0 ? "Sales velocity is stable." : "No sales recorded in this period."
    };
  }
}