import { AiService } from './ai.service';
export declare class AiController {
    private aiService;
    constructor(aiService: AiService);
    chat(body: {
        message: string;
    }, req: any): Promise<{
        text: string;
    }>;
}
