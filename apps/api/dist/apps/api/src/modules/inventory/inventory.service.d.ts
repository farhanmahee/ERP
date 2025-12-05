import { LoggingService } from '../logging/logging.service';
export declare class InventoryService {
    private readonly loggingService;
    private readonly firestore;
    private readonly inventoryCollection;
    constructor(loggingService: LoggingService);
    create(item: any): Promise<any>;
    findAll(): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
    }>;
    update(id: string, item: any): Promise<any>;
    remove(id: string): Promise<void>;
}
