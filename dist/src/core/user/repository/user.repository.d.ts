import { IDatabaseService } from '@/infra/database/postgres';
export type User = {
    id?: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    role: string;
    is_activated: boolean;
};
export declare class UserRepository {
    private databaseService;
    constructor(databaseService: IDatabaseService);
    findById(id: string): Promise<User>;
    findAll(): Promise<User[]>;
    create(user: User): Promise<User>;
}
