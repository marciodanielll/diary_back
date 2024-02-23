import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';

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

export class UserCreateUseCase {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data: User): Promise<User> {
    const newUser = new UserEntity(
      data.name,
      data.email,
      data.password,
      data.role,
      data.createdAt,
      data.updatedAt,
      data.isActivated,
    );
    const user = await this.userRepository.create(newUser.getWithSnakeCase());

    return user as unknown as User;
  }
}
