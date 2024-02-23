import { UserCreateUseCase } from './use-cases/user.create';
import { UserGetAllUseCase } from './use-cases/user.getall';
export declare class UserController {
    private readonly userCreateUseCase;
    private readonly userGetAllUseCase;
    constructor(userCreateUseCase: UserCreateUseCase, userGetAllUseCase: UserGetAllUseCase);
    create(req: any): Promise<{
        id?: string;
        name: string;
        email: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
        isActivated: boolean;
        role: string;
    }>;
    getAll(): Promise<import("./repository/user.repository").User[]>;
}
