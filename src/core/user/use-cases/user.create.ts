import { UserRepository } from '../repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { ITokenAdapter } from '@/libs/token/adapter';
import { ICryptoAdapter } from '@/libs/crypto';

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
  private tokenService: ITokenAdapter;
  private cryptoService: ICryptoAdapter;

  constructor(
    userRepository: UserRepository,
    tokenService: ITokenAdapter,
    cryptoService: ICryptoAdapter,
  ) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.cryptoService = cryptoService;
  }

  async execute(data: User): Promise<{ token: string }> {
    const userEntity = new UserEntity(
      data.name,
      data.email,
      data.password,
      data.role,
      data.createdAt,
      data.updatedAt,
      data.isActivated,
    );

    const dataUser = userEntity.getWithSnakeCase();

    const password = await this.cryptoService.createHash(data.password);

    await this.userRepository.create({ ...dataUser, password });

    const token = this.tokenService.createToken({
      email: data.email,
      role: data.role,
    });

    return { token };
  }
}
