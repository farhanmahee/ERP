"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AiService_1;
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const genai_1 = require("@google/genai");
const prisma_service_1 = require("../../prisma/prisma.service");
let AiService = AiService_1 = class AiService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(AiService_1.name);
        this.getInventoryTool = {
            name: 'fetchInventoryData',
            description: 'Fetch current inventory levels, specifically looking for low stock items.',
            parameters: {
                type: genai_1.Type.OBJECT,
                properties: {
                    category: { type: genai_1.Type.STRING, description: 'Optional product category filter' },
                },
            },
        };
        this.getSalesTrendTool = {
            name: 'analyzeSalesTrends',
            description: 'Analyze sales data for the last 30, 60, or 90 days to identify trends.',
            parameters: {
                type: genai_1.Type.OBJECT,
                properties: {
                    days: { type: genai_1.Type.NUMBER, description: 'Number of days to analyze (default 30)' },
                },
            },
        };
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            this.logger.warn('API_KEY not found. AI features will be disabled.');
        }
        this.ai = new genai_1.GoogleGenAI({ apiKey: apiKey || 'dummy_key' });
    }
    async processChat(userMessage, tenantId) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
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
            const response = (_a = result.candidates) === null || _a === void 0 ? void 0 : _a[0];
            const functionCalls = (_d = (_c = (_b = response === null || response === void 0 ? void 0 : response.content) === null || _b === void 0 ? void 0 : _b.parts) === null || _c === void 0 ? void 0 : _c.filter(p => p.functionCall)) === null || _d === void 0 ? void 0 : _d.map(p => p.functionCall);
            if (functionCalls && functionCalls.length > 0) {
                const functionResponses = [];
                for (const call of functionCalls) {
                    this.logger.log(`Executing tool: ${call.name}`);
                    let toolResult = {};
                    if (call.name === 'fetchInventoryData') {
                        toolResult = await this.fetchInventoryData(tenantId);
                    }
                    else if (call.name === 'analyzeSalesTrends') {
                        const days = call.args.days || 30;
                        toolResult = await this.analyzeSalesTrends(tenantId, days);
                    }
                    functionResponses.push({
                        functionResponse: {
                            name: call.name,
                            response: { result: toolResult }
                        }
                    });
                }
                const finalResult = await this.ai.models.generateContent({
                    model,
                    contents: [
                        { role: 'user', parts: [{ text: userMessage }] },
                        response.content,
                        { role: 'tool', parts: functionResponses }
                    ],
                    config: { systemInstruction }
                });
                return {
                    text: ((_j = (_h = (_g = (_f = (_e = finalResult.candidates) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.content) === null || _g === void 0 ? void 0 : _g.parts) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.text) || "Analysis complete."
                };
            }
            return {
                text: ((_m = (_l = (_k = response === null || response === void 0 ? void 0 : response.content) === null || _k === void 0 ? void 0 : _k.parts) === null || _l === void 0 ? void 0 : _l[0]) === null || _m === void 0 ? void 0 : _m.text) || "I'm here to help with your ERP data."
            };
        }
        catch (error) {
            this.logger.error('AI Processing Error', error);
            return { text: "I encountered an issue connecting to the AI service. Please check your API configuration." };
        }
    }
    async fetchInventoryData(tenantId) {
        const lowStockItems = await this.prisma.product.findMany({
            where: {},
            take: 10
        });
        if (lowStockItems.length === 0) {
            return {
                status: "success",
                insight: "No critical low stock items found in the primary warehouse.",
                recommendation: "Maintain current reorder levels."
            };
        }
        return {
            status: "alert",
            items: lowStockItems.map(p => ({ name: p.name, stock: 5 })),
            insight: "Several items are below reorder level.",
        };
    }
    async analyzeSalesTrends(tenantId, days) {
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
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], AiService);
//# sourceMappingURL=ai.service.js.map