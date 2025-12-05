import { SeederService } from './seeder.service';
export declare class SeederController {
    private readonly seederService;
    constructor(seederService: SeederService);
    seedAll(): Promise<{
        message: string;
    }>;
}
