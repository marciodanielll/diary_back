/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, Get, Req } from '@nestjs/common';
import { UserCreateUseCase } from './use-cases/user.create';
import { UserGetAllUseCase } from './use-cases/user.getall';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userCreateUseCase: UserCreateUseCase,
    private readonly userGetAllUseCase: UserGetAllUseCase,
  ) {}
  @Post()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John Doe',
        },
        email: {
          type: 'string',
          example: 'md@md.com',
        },
        password: {
          type: 'string',
          example: '123456789888',
        },
        role: {
          type: 'string',
          example: 'admin',
        },
      },
    },
  })
  async create(@Req() req: any) {
    return await this.userCreateUseCase.execute(req.body);
  }

  @Get()
  async getAll() {
    return await this.userGetAllUseCase.execute();
  }
}
