import { IUserRepository } from '@/core/user/user.repository';
import { IDiaryRepository } from '../diary.repository';
import { ILoggerAdapter } from '@/infra/logger';
import { ValidateSchema } from '@/utils/validators/validate-schema.decorator';
import {
  Diary,
  DiaryCreateInput,
  DiaryCreateOutput,
  diaryCreateInputSchema,
} from '../types';
import { ApiBadRequestException } from '@/utils/exception';
import { DiaryEntity } from '../diary.entity';
import { ICryptoAdapter } from '@/libs/crypto';
import { UserEntity } from '@/core/user/user.entity';
export class CreateDiaryUseCase {
  private readonly diaryRepository: IDiaryRepository;
  private readonly userRepository: IUserRepository;
  private readonly logger: ILoggerAdapter;
  private readonly cryptoService: ICryptoAdapter;
  private readonly context = CreateDiaryUseCase.name;

  constructor(
    diaryRepository: IDiaryRepository,
    userRepository: IUserRepository,
    logger: ILoggerAdapter,
    cryptoService: ICryptoAdapter,
  ) {
    this.diaryRepository = diaryRepository;
    this.userRepository = userRepository;
    this.logger = logger;
    this.cryptoService = cryptoService;
  }

  @ValidateSchema(diaryCreateInputSchema)
  async execute(data: DiaryCreateInput): Promise<DiaryCreateOutput> {
    this.logger.debug({
      message: 'Creating diary',
      context: this.context,
      obj: data,
    });

    try {
      const user = await this.userRepository.findOne(
        {
          email: data.email,
        },
        ['diaries'],
      );

      if (!user) {
        throw new ApiBadRequestException('Usuário não encontrado');
      }

      const userEntity = new UserEntity(user);

      const newKey = this.cryptoService.createKey();

      const { encryptedData, iv } = this.cryptoService.encryptText(
        data.text,
        newKey,
      );

      const dataDiary: Diary = {
        iv,
        encryptedData,
        userId: user.id,
      };

      const diaryEntity = new DiaryEntity(dataDiary);

      userEntity.diaries.push(diaryEntity);

      this.logger.debug({
        message: 'Diary created',
        context: this.context,
        obj: diaryEntity,
      });

      await this.userRepository.create(userEntity);

      return userEntity as unknown as DiaryCreateOutput;
    } catch (error) {
      error.context = this.context;
      throw error;
    }
  }
}
