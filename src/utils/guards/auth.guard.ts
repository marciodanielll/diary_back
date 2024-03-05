import { ILoggerAdapter } from '@/infra/logger';
import { ITokenAdapter } from '@/libs/token/adapter';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly tokenService: ITokenAdapter;
  private readonly logger: ILoggerAdapter;

  constructor(tokenService: ITokenAdapter, logger: ILoggerAdapter) {
    this.tokenService = tokenService;
    this.logger = logger;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const decode = this.tokenService.decodeToken(token);

      if (typeof decode !== 'object') {
        throw new UnauthorizedException();
      }

      request['user'] = decode;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
