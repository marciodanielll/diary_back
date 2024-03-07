import { SwaggerResponseUser, SwaggerRequestUser } from './swagger';
import { ILoggerAdapter } from '@/infra/logger';
import { ISingInUseCaseUseCaseAdapter, ISingUpUseCaseAdapter } from './adapter';
import { Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInInput, SignUpInput } from '../../core/user/types';
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
  @ApiOperation({ summary: 'Create a new user for access application' })
  @ApiResponse(SwaggerResponseUser.signup[201])
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody(SwaggerRequestUser.receivePayloadToSignUp)
  async singup(@Req() { body: dataUser }: Request & { body: SignUpInput }) {
    return this.singUpUseCase.execute(dataUser);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Signin' })
  @ApiResponse(SwaggerResponseUser.signin[200])
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody(SwaggerRequestUser.receivePayloadToSignIn)
  async signin(@Req() { body: dataUser }: Request & { body: SignInInput }) {
    return this.sigInUseCase.execute(dataUser);
  }
}
