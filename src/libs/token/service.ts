import { ISecretsAdapter } from '@/infra/secrets';
import { ITokenAdapter } from './adapter';
import jwt from 'jsonwebtoken';
import { ILoggerAdapter } from '@/infra/logger';
import { jwtAlgorithms } from './types';

export class TokenService implements ITokenAdapter {
  private readonly secret: string;
  private readonly logger: ILoggerAdapter;
  private readonly context = TokenService.name;
  private readonly jwt = jwt;
  private readonly algorithm: (typeof jwtAlgorithms)[number];
  private readonly expiresIn: string;

  constructor(
    logger: ILoggerAdapter,
    { JWT_SECRET, JWT_ALGORITHM, JWT_EXPIRES_IN }: ISecretsAdapter,
  ) {
    this.secret = JWT_SECRET;
    this.logger = logger;
    this.algorithm = JWT_ALGORITHM;
    this.expiresIn = JWT_EXPIRES_IN;
  }

  createToken(payload: Record<string, string>): string {
    const token = this.jwt.sign(payload, this.secret, {
      algorithm: this.algorithm,
      expiresIn: this.expiresIn,
    });

    return token;
  }
  decodeToken(token: string): Record<string, string> | string {
    try {
      const decode = this.jwt.verify(token, this.secret);

      return decode;
    } catch (error) {
      this.logger.error(error, this.context);
      return error?.message || 'Invalid Token';
    }
  }
}
