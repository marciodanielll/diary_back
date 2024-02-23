import { UserRepository } from '../repository/user.repository';
type User = {
    id?: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isActivated: boolean;
    role: string;
};
export declare class UserCreateUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(data: User): Promise<User>;
}
export {};
