export declare class AiController {
    private readonly logger;
    constructor();
    chat(body: {
        message: string;
    }, req: any): Promise<{
        text: unknown;
    }>;
}
