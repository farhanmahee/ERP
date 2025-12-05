import { DatabaseService } from './database.service';
export declare class DatabaseController {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    getUsers(): Promise<FirebaseFirestore.DocumentData[]>;
}
