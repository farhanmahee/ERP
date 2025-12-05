import { LoggingService } from '../logging/logging.service';
export declare class SyncService {
    private readonly loggingService;
    private readonly primaryFirestore;
    private readonly secondaryFirestore;
    constructor(loggingService: LoggingService);
    syncCollection(collectionName: string): Promise<{
        message: string;
        documentsCopied: number;
    }>;
}
