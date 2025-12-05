import { PrismaService } from '../../prisma/prisma.service';
export declare class AiService {
    private prisma;
    private ai;
    private readonly logger;
    constructor(prisma: PrismaService);
    private getInventoryTool;
    private getSalesTrendTool;
    processChat(userMessage: string, tenantId: string): Promise<{
        text: string;
    }>;
    private fetchInventoryData;
    private analyzeSalesTrends;
}
