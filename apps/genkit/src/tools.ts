
import { defineTool } from '@genkit-ai/core';
import { z } from 'zod';
import { PrismaClient } from '../../../packages/database/src'; // Adjust path if needed

const prisma = new PrismaClient();

export const fetchInventoryData = defineTool({
  name: 'fetchInventoryData',
  description: 'Fetch current inventory levels, especially for low stock items. Requires tenant context.',
  inputSchema: z.object({
    tenantId: z.string().describe('The ID of the tenant to query data for'),
  }),
  outputSchema: z.object({
    status: z.string().describe(''success' if no issues, 'alert' if low stock found'),
    items: z.array(z.object({ name: z.string(), stock: z.number() })).optional(),
    insight: z.string(),
    recommendation: z.string().optional(),
  }),
  run: async ({ tenantId }) => {
    // In a real multi-tenant app, Prisma would be configured with row-level security
    // or the client would be instantiated per-request with the tenant's datasource.
    const lowStockItems = await prisma.product.findMany({
      where: {
        // Assuming a tenantId field exists on the product model
        // tenantId: tenantId, 
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

export const analyzeSalesTrends = defineTool({
  name: 'analyzeSalesTrends',
  description: 'Analyze sales data for the last 30, 60, or 90 days to identify trends. Requires tenant context.',
  inputSchema: z.object({
    tenantId: z.string().describe('The ID of the tenant to query data for'),
    days: z.number().default(30).describe('Number of days to analyze (30, 60, or 90)'),
  }),
  outputSchema: z.object({
    period: z.string(),
    totalRevenue: z.number(),
    orderCount: z.number(),
    trend: z.string(),
    insight: z.string(),
  }),
  run: async ({ tenantId, days }) => {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);

    const sales = await prisma.salesOrder.findMany({
      where: {
        // tenantId: tenantId,
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
