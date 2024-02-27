import { ILoggerAdapter } from '@/infra/logger';
import { IUserCreateUseCaseAdapter, IUserLoginUseCaseAdapter } from './adapter';
import { Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../core/user/types';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  readonly userCreateUseCase: IUserCreateUseCaseAdapter;
  readonly logger: ILoggerAdapter;
  readonly userLoginUseCase: IUserLoginUseCaseAdapter;
  constructor(
    userCreateUseCase: IUserCreateUseCaseAdapter,
    logger: ILoggerAdapter,
    userLoginUseCase: IUserLoginUseCaseAdapter,
  ) {
    this.userCreateUseCase = userCreateUseCase;
    this.logger = logger;
    this.userLoginUseCase = userLoginUseCase;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmNpby5kYW5pZWxAbXNuLmNvbSIsIm5hbWUiOiJNw6FyY2lvIERhbmllbCIsImlhdCI6MTcwOTA1MzkyMiwiZXhwIjoxNzA5NDg1OTIyfQ.VQR5PA-5yMS86cfSE_wIVvEXw3iY1yu_ZGiD9CGwlLU',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Márcio Daniel',
        },
        email: {
          type: 'string',
          example: 'marcio.daniel@msn.com',
        },
        password: {
          type: 'string',
          example: '12345678',
        },
      },
    },
  })
  async create(@Req() { body: user }: Request & { body: User }) {
    return this.userCreateUseCase.execute(user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully logged in.',
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmNpby5kYW5pZWxAbXNuLmNvbSIsIm5hbWUiOiJNw6FyY2lvIERhbmllbCIsImlhdCI6MTcwOTA1MzkyMiwiZXhwIjoxNzA5NDg1OTIyfQ.VQR5PA-5yMS86cfSE_wIVvEXw3iY1yu_ZGiD9CGwlLU',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'marcio.daniel@msn.com',
        },
        password: {
          type: 'string',
          example: '12345678',
        },
      },
    },
  })
  async login(@Req() { body: user }: Request & { body: User }) {
    return this.userLoginUseCase.execute(user);
  }
}
