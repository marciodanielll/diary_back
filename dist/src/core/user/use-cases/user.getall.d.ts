import { User, UserRepository } from '../repository/user.repository';
export declare class UserGetAllUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(): Promise<User[]>;
}
