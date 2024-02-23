import { ISecretsAdapter } from '@/infra/secrets';
import { ICryptoAdapter } from './adapter';
import bcrypt from 'bcrypt';
import { ILoggerAdapter } from '@/infra/logger';

export class CryptoService implements ICryptoAdapter {
  private readonly salt: number;
  private readonly secret: string;
  private readonly logger: ILoggerAdapter;
  private readonly context = CryptoService.name;
  private readonly bcrypt = bcrypt;

  constructor(
    { CRYPTO_SALT, CRYPTO_SECRET }: ISecretsAdapter,
    logger: ILoggerAdapter,
  ) {
    this.salt = CRYPTO_SALT;
    this.secret = CRYPTO_SECRET;
    this.logger = logger;
  }

  async createHash(password: string): Promise<string> {
    const hash = await this.bcrypt.hash(`${password}${this.secret}`, this.salt);
    return hash;
  }

  async validateHash(password: string, hash: string): Promise<boolean> {
    const check = await this.bcrypt.compare(`${password}${this.secret}`, hash);
    return check;
  }
}
