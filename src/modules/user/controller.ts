import { ILoggerAdapter } from '@/infra/logger';
import { IUserCreateUseCaseAdapter } from './adapter';
import { Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../core/user/types';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  readonly userCreateUseCase: IUserCreateUseCaseAdapter;
  readonly logger: ILoggerAdapter;
  constructor(
    userCreateUseCase: IUserCreateUseCaseAdapter,
    logger: ILoggerAdapter,
  ) {
    this.userCreateUseCase = userCreateUseCase;
    this.logger = logger;
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
          example: '3432432423',
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
          example: 'md@md.com',
        },
        password: {
          type: 'string',
          example: '123456789888',
        },
      },
    },
  })
  async create(@Req() { body: user }: Request & { body: User }) {
    return this.userCreateUseCase.execute(user);
  }
}
