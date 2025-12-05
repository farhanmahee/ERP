import { SyncService } from './sync.service';
export declare class SyncController {
    private readonly syncService;
    constructor(syncService: SyncService);
    syncFirestore(body: {
        collectionName: string;
    }): Promise<{
        message: string;
        documentsCopied: number;
    }>;
}
