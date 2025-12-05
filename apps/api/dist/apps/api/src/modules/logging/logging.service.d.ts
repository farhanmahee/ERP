export declare class LoggingService {
    private readonly firestore;
    log(level: 'info' | 'warn' | 'error', message: string, data?: object): Promise<void>;
}
