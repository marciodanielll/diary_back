import { ApiBadRequestException } from '../../../utils/exception';
import { ILoggerAdapter } from '@/infra/logger';
import { IUserRepository } from '../user.repository';
import { SignUpInput, SignUpOutput, signUpSchema } from '../types';
import { UserEntity } from '../user.entity';
import { ICryptoAdapter } from '@/libs/crypto';
import { ITokenAdapter } from '@/libs/token/adapter';
import { ValidateSchema } from '@/utils/validators/validate-schema.decorator';

export class SignUpUseCase {
  private readonly repository: IUserRepository;
  private readonly logger: ILoggerAdapter;
  private readonly cryptoService: ICryptoAdapter;
  private readonly tokenService: ITokenAdapter;
  private readonly context = SignUpUseCase.name;

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

  @ValidateSchema(signUpSchema)
  async execute(data: SignUpInput): Promise<SignUpOutput> {
    this.logger.info({
      message: 'Signing up entry',
      context: this.context,
      obj: data,
    });

    try {
      const userEntity = new UserEntity(data);

      const userExist = await this.repository.findOne({ email: data.email });

      if (userExist) {
        throw new ApiBadRequestException('Email já cadastrado.');
      }

      userEntity.insertHashPassword(
        await this.cryptoService.createHash(userEntity.password),
      );

      const newUser = await this.repository.create(userEntity);

      const token = this.tokenService.createToken({
        email: data.email,
        name: data.name,
      });

      const response = {
        token,
        id: newUser.id,
      };

      this.logger.info({
        message: 'Signing up success',
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
