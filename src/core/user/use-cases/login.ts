import { ApiBadRequestException } from './../../../utils/exception';
import { ILoggerAdapter } from '@/infra/logger';
import { IUserRepository } from '../repository';
import { UserLoginInput, UserLoginOutput } from '../types';
import { UserEntity } from '../user.entity';
import { ICryptoAdapter } from '@/libs/crypto';
import { ITokenAdapter } from '@/libs/token/adapter';

export class UserLoginUseCase {
  private readonly repository: IUserRepository;
  private readonly logger: ILoggerAdapter;
  private readonly cryptoService: ICryptoAdapter;
  private readonly tokenService: ITokenAdapter;
  private readonly context = UserLoginUseCase.name;

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

  async execute(data: UserLoginInput): Promise<UserLoginOutput> {
    const userExist = await this.repository.findOne({ email: data.email });

    if (!userExist) {
      throw new ApiBadRequestException('Email ou senha incorretos');
    }

    const userEntity = new UserEntity(userExist);

    const isPasswordMatch = await this.cryptoService.validateHash(
      data.password,
      userEntity.password,
    );

    if (!isPasswordMatch) {
      throw new ApiBadRequestException('Email ou senha incorretos');
    }

    const token = this.tokenService.createToken({
      email: data.email,
      name: userEntity.name,
    });

    return { token };
  }
}
