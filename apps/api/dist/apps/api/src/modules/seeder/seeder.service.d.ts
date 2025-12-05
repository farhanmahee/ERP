import { LoggingService } from '../logging/logging.service';
export declare class SeederService {
    private readonly loggingService;
    private readonly firestore;
    private readonly database;
    constructor(loggingService: LoggingService);
    seedUsers(): Promise<void>;
    seedChats(): Promise<void>;
    seedPresence(): Promise<void>;
    updateUser(): Promise<{
        message: string;
    }>;
    getUsers(): Promise<any>;
    clearDatabase(): Promise<{
        message: string;
    }>;
    private deleteCollection;
    private deleteQueryBatch;
    seedCollection(collectionName: string, data: any[]): Promise<void>;
    seedAll(): Promise<{
        message: string;
    }>;
}
