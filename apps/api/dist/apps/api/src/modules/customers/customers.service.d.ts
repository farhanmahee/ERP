import { LoggingService } from '../logging/logging.service';
export declare class CustomersService {
    private readonly loggingService;
    private readonly firestore;
    private readonly customersCollection;
    constructor(loggingService: LoggingService);
    create(customer: any): Promise<any>;
    findAll(): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
    }>;
    update(id: string, customer: any): Promise<any>;
    remove(id: string): Promise<void>;
}
