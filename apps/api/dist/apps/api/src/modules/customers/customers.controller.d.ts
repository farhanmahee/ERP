import { CustomersService } from './customers.service';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
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
