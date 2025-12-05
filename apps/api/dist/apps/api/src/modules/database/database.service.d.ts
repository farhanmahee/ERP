export declare class DatabaseService {
    private readonly firestore;
    getUsers(): Promise<FirebaseFirestore.DocumentData[]>;
}
