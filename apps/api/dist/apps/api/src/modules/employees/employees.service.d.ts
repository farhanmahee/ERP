import { LoggingService } from '../logging/logging.service';
export declare class EmployeesService {
    private readonly loggingService;
    private readonly firestore;
    private readonly employeesCollection;
    constructor(loggingService: LoggingService);
    create(employee: any): Promise<any>;
    findAll(): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
    }>;
    update(id: string, employee: any): Promise<any>;
    remove(id: string): Promise<void>;
}
