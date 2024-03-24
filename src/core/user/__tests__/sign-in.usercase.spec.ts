import { Test } from '@nestjs/testing';
import { ILoggerAdapter } from '@infra/logger/';
import { IUserRepository } from '../user.repository';
import { ICryptoAdapter } from '@libs/crypto';
import { ITokenAdapter } from '@libs/token';
import { expectZodError } from '@utils/tests/helpers';
import { SingInUseCase } from '../use-cases/sign-in.usecase';
import { ISingInUseCaseUseCaseAdapter } from '@modules/user/adapter';
import { Roles, User } from '../types';

const MOCK_USER: User = {
  email: 'marcio.daniel@msn.com',
  name: 'Márcio Daniel',
  password: 'password',
  role: Roles.USER,
  isActivated: true,
  diaries: [],
};

describe('SignInUseCase', () => {
  let SUT: ISingInUseCaseUseCaseAdapter;
  let logger: ILoggerAdapter;
  let useRepository: IUserRepository;
  let cryptoService: ICryptoAdapter;
  let tokenService: ITokenAdapter;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: IUserRepository,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: ILoggerAdapter,
          useValue: {
            debug: jest.fn().mockReturnValue,
          },
        },
        {
          provide: ICryptoAdapter,
          useValue: {
            validateHash: jest.fn(),
          },
        },
        {
          provide: ITokenAdapter,
          useValue: {
            createToken: jest.fn().mockReturnValue('token'),
          },
        },
        {
          provide: ISingInUseCaseUseCaseAdapter,
          useFactory: (
            userRepository: IUserRepository,
            logger: ILoggerAdapter,
            cryptoService: ICryptoAdapter,
            tokenService: ITokenAdapter,
          ) => {
            return new SingInUseCase(
              userRepository,
              logger,
              cryptoService,
              tokenService,
            );
          },
          inject: [
            IUserRepository,
            ILoggerAdapter,
            ICryptoAdapter,
            ITokenAdapter,
          ],
        },
      ],
    }).compile();

    SUT = app.get(ISingInUseCaseUseCaseAdapter);
    logger = app.get(ILoggerAdapter);
    useRepository = app.get(IUserRepository);
    cryptoService = app.get(ICryptoAdapter);
    tokenService = app.get(ITokenAdapter);
  });

  test('when input is invalid, should expect an error ', async () => {
    await expectZodError(
      () => SUT.execute({}),
      (issues) => {
        expect(issues).toEqual([
          { message: 'Required', path: 'password' },
          { message: 'Required', path: 'email' },
        ]);
      },
    );
  });

  test('should inform the correct error message when not providing a valid email', async () => {
    await expectZodError(
      () => SUT.execute({ email: 'invalid-email', password: 'password' }),
      (issues) => {
        expect(issues).toEqual([{ message: 'Invalid email', path: 'email' }]);
      },
    );
  });
  test('should inform the correct error message when not providing a valid password', async () => {
    await expectZodError(
      () => SUT.execute({ email: 'marcio.daniel@msn.com', password: '' }),
      (issues) => {
        expect(issues).toEqual([
          {
            message: 'String must contain at least 8 character(s)',
            path: 'password',
          },
        ]);
      },
    );
  });

  test('should return an error when user does not exist', async () => {
    const user = {
      email: MOCK_USER.email,
      password: MOCK_USER.password,
    };

    useRepository.findOne = jest.fn().mockResolvedValue(null);
    logger.debug = jest.fn();

    try {
      await SUT.execute(user);
    } catch (error) {
      expect(useRepository.findOne).toHaveBeenCalledTimes(1);
      expect(useRepository.findOne).toHaveBeenCalledWith({ email: user.email });
      expect(cryptoService.validateHash).toHaveBeenCalledTimes(0);
      expect(tokenService.createToken).toHaveBeenCalledTimes(0);
      expect(logger.debug).toHaveBeenCalledTimes(1);
      expect(error.message).toBe('Email ou senha incorretos');
    }
  });

  test('should return an error when password is incorrect', async () => {
    const user = {
      email: MOCK_USER.email,
      password: MOCK_USER.password,
    };

    useRepository.findOne = jest.fn().mockResolvedValue(MOCK_USER);
    cryptoService.validateHash = jest.fn().mockResolvedValue(false);
    logger.debug = jest.fn();

    try {
      await SUT.execute(user);
    } catch (error) {
      expect(useRepository.findOne).toHaveBeenCalledTimes(1);
      expect(useRepository.findOne).toHaveBeenCalledWith({ email: user.email });
      expect(cryptoService.validateHash).toHaveBeenCalledTimes(1);
      expect(cryptoService.validateHash).toHaveBeenCalledWith(
        user.password,
        MOCK_USER.password,
      );
      expect(tokenService.createToken).toHaveBeenCalledTimes(0);
      expect(logger.debug).toHaveBeenCalledTimes(1);
      expect(error.message).toBe('Email ou senha incorretos');
    }
  });

  test('should return a token when  email and password are correct', async () => {
    const user = {
      email: 'marcio.daniel@msn.com',
      password: 'password',
    };

    useRepository.findOne = jest.fn().mockResolvedValue(MOCK_USER);
    cryptoService.validateHash = jest.fn().mockResolvedValue(true);
    tokenService.createToken = jest.fn().mockReturnValue('token');

    const result = await SUT.execute(user);

    expect(result).toEqual({ token: 'token', name: MOCK_USER.name });
  });
});
