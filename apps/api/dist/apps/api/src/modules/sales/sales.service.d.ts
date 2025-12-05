import { LoggingService } from '../logging/logging.service';
export declare class SalesService {
    private readonly loggingService;
    private readonly firestore;
    private readonly salesCollection;
    constructor(loggingService: LoggingService);
    create(sale: any): Promise<any>;
    findAll(): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
    }>;
    update(id: string, sale: any): Promise<any>;
    remove(id: string): Promise<void>;
}
