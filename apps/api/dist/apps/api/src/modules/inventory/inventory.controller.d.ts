import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
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
