import { IDatabaseService } from '@/infra/database/postgres';
export declare class HealthController {
    private databaseService;
    constructor(databaseService: IDatabaseService);
    getHealth(): Promise<string>;
}
