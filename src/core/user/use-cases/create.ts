import { ApiBadRequestException } from './../../../utils/exception';
import { ILoggerAdapter } from '@/infra/logger';
import { IUserRepository } from '../repository';
import { UserCreateInput, UserCreateOutput } from '../types';
import { UserEntity } from '../user.entity';
import { ICryptoAdapter } from '@/libs/crypto';
import { ITokenAdapter } from '@/libs/token/adapter';

export class UserCreateUseCase {
  private readonly repository: IUserRepository;
  private readonly logger: ILoggerAdapter;
  private readonly cryptoService: ICryptoAdapter;
  private readonly tokenService: ITokenAdapter;
  private readonly context = UserCreateUseCase.name;

  constructor(
    userRepository: IUserRepository,
    logger: ILoggerAdapter,
    cryptoService: ICryptoAdapter,
    tokenService: ITokenAdapter,
  ) {
    this.repository = userRepository;
    this.logger = logger;
    this.cryptoService = cryptoService;
    this.tokenService = tokenService;
  }

  async execute(data: UserCreateInput): Promise<UserCreateOutput> {
    const userEntity = new UserEntity(data);

    const userExist = await this.repository.findOne({ email: data.email });

    if (userExist) {
      throw new ApiBadRequestException('Email já cadastrado.');
    }

    userEntity.insertHashPassword(
      await this.cryptoService.createHash(userEntity.password),
    );

    await this.repository.create(userEntity);

    const token = this.tokenService.createToken({
      email: data.email,
      name: data.name,
    });

    return { token, name: data.name };
  }
}
