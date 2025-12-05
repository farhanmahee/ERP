"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeSalesTrends = exports.fetchInventoryData = void 0;
const core_1 = require("@genkit-ai/core");
const zod_1 = require("zod");
const src_1 = require("../../../packages/database/src");
const prisma = new src_1.PrismaClient();
exports.fetchInventoryData = (0, core_1.defineTool)({
    name: 'fetchInventoryData',
    description: 'Fetch current inventory levels, especially for low stock items. Requires tenant context.',
    inputSchema: zod_1.z.object({
        tenantId: zod_1.z.string().describe('The ID of the tenant to query data for'),
    }),
    outputSchema: zod_1.z.object({
        status: zod_1.z.string().describe('', success, ' if no issues, ', alert, ' if low stock found'),
        items: zod_1.z.array(zod_1.z.object({ name: zod_1.z.string(), stock: zod_1.z.number() })).optional(),
        insight: zod_1.z.string(),
        recommendation: zod_1.z.string().optional(),
    }),
    run: async ({ tenantId }) => {
        const lowStockItems = await prisma.product.findMany({
            where: {
                stockQuantity: { lte: 10 },
            },
            take: 10,
        });
        if (lowStockItems.length === 0) {
            return {
                status: 'success',
                insight: 'No critical low stock items found in the primary warehouse.',
                recommendation: 'Maintain current reorder levels.',
            };
        }
        return {
            status: 'alert',
            items: lowStockItems.map(p => ({ name: p.name, stock: p.stockQuantity || 0 })),
            insight: `Found ${lowStockItems.length} items at or below the reorder threshold.`,
        };
    },
});
exports.analyzeSalesTrends = (0, core_1.defineTool)({
    name: 'analyzeSalesTrends',
    description: 'Analyze sales data for the last 30, 60, or 90 days to identify trends. Requires tenant context.',
    inputSchema: zod_1.z.object({
        tenantId: zod_1.z.string().describe('The ID of the tenant to query data for'),
        days: zod_1.z.number().default(30).describe('Number of days to analyze (30, 60, or 90)'),
    }),
    outputSchema: zod_1.z.object({
        period: zod_1.z.string(),
        totalRevenue: zod_1.z.number(),
        orderCount: zod_1.z.number(),
        trend: zod_1.z.string(),
        insight: zod_1.z.string(),
    }),
    run: async ({ tenantId, days }) => {
        const dateThreshold = new Date();
        dateThreshold.setDate(dateThreshold.getDate() - days);
        const sales = await prisma.salesOrder.findMany({
            where: {
                orderDate: { gte: dateThreshold },
            },
        });
        const totalRevenue = sales.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0);
        const count = sales.length;
        return {
            period: `${days} days`,
            totalRevenue: totalRevenue,
            orderCount: count,
            trend: count > 0 ? 'Positive' : 'No Data',
            insight: count > 0 ? `Sales velocity is stable with ${count} orders in the last ${days} days.` : 'No sales recorded in this period.',
        };
    },
});
//# sourceMappingURL=tools.js.map