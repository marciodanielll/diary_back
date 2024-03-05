import { ILoggerAdapter } from '@/infra/logger';
import { ISingInUseCaseUseCaseAdapter, ISingUpUseCaseAdapter } from './adapter';
import { Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInInput, SignInOutput } from '../../core/user/types';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  readonly singUpUseCase: ISingUpUseCaseAdapter;
  readonly logger: ILoggerAdapter;
  readonly sigInUseCase: ISingInUseCaseUseCaseAdapter;
  constructor(
    singUpUseCase: ISingUpUseCaseAdapter,
    logger: ILoggerAdapter,
    sigInUseCase: ISingInUseCaseUseCaseAdapter,
  ) {
    this.singUpUseCase = singUpUseCase;
    this.logger = logger;
    this.sigInUseCase = sigInUseCase;
  }

  @Post('singup')
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
  async create(@Req() { body: dataUser }: Request & { body: SignInOutput }) {
    return this.singUpUseCase.execute(dataUser);
  }

  @Post('signin')
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
        name: {
          type: 'string',
          example: 'Márcio Daniel',
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
  async login(@Req() { body: dataUser }: Request & { body: SignInInput }) {
    return this.sigInUseCase.execute(dataUser);
  }
}
