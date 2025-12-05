import { SalesService } from './sales.service';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
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
