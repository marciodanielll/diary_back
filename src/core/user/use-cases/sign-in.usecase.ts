import { ApiBadRequestException } from '../../../utils/exception';
import { ILoggerAdapter } from '@infra/logger';
import { IUserRepository } from '../user.repository';
import { SignInInput, SignInOutput, signInSchema } from '../types';
import { UserEntity } from '../user.entity';
import { ICryptoAdapter } from '@libs/crypto';
import { ITokenAdapter } from '@libs/token';
import { ValidateSchema } from '@utils/validators/validate-schema.decorator';

export class SingInUseCase {
  private readonly repository: IUserRepository;
  private readonly logger: ILoggerAdapter;
  private readonly cryptoService: ICryptoAdapter;
  private readonly tokenService: ITokenAdapter;
  private readonly context = SingInUseCase.name;

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

  @ValidateSchema(signInSchema)
  async execute(data: SignInInput): Promise<SignInOutput> {
    try {
      this.logger.debug({
        message: 'Signing in entry',
        context: this.context,
      });

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

      const response = {
        token,
        name: userEntity.name,
      };

      this.logger.debug({
        message: 'Signing in success',
        context: this.context,
        obj: response,
      });

      return response;
    } catch (error) {
      error.context = this.context;

      throw error;
    }
  }
}
