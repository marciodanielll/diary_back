import { User, UserRepository } from '../repository/user.repository';

export class UserGetAllUseCase {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }
}
