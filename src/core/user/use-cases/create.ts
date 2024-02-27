import { IUserRepository } from '../repository';
import { User } from '../types';
import { UserEntity } from '../user.entity';

export class UserCreateUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: User) {
    const user = new UserEntity(data);
    return this.userRepository.create(user);
  }
}
