import { EncryptedText, encodingsTuple } from './types';
import { ISecretsAdapter } from '@/infra/secrets';
import { ICryptoAdapter } from './adapter';
import bcrypt from 'bcrypt';
import { ILoggerAdapter } from '@/infra/logger';
import crypto from 'crypto';

export class CryptoService implements ICryptoAdapter {
  private readonly salt: number;
  private readonly secret: string;
  private readonly cipher: string;
  private readonly encoding: (typeof encodingsTuple)[number];
  private readonly logger: ILoggerAdapter;
  private readonly bcrypt = bcrypt;
  private readonly crypto = crypto;
  private readonly context = CryptoService.name;

  constructor(
    {
      CRYPTO_SALT,
      CRYPTO_SECRET,
      CRYPTO_CIPHER,
      CRYPTO_ENCODING,
    }: ISecretsAdapter,
    logger: ILoggerAdapter,
  ) {
    this.salt = CRYPTO_SALT;
    this.secret = CRYPTO_SECRET;
    this.logger = logger;
    this.cipher = CRYPTO_CIPHER;
    this.encoding = CRYPTO_ENCODING;
  }

  async createHash(password: string): Promise<string> {
    const hash = await this.bcrypt.hash(`${password}${this.secret}`, this.salt);
    return hash;
  }

  async validateHash(password: string, hash: string): Promise<boolean> {
    const check = await this.bcrypt.compare(`${password}${this.secret}`, hash);
    return check;
  }

  createKey(): string {
    return this.crypto.randomBytes(32).toString(this.encoding);
  }

  encryptText(text: string, key: string): EncryptedText {
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(
      this.cipher,
      Buffer.from(key, this.encoding),
      iv,
    );

    let encrypted = cipher.update(text, 'utf8');

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    const encryptedResult: EncryptedText = {
      iv: iv.toString(this.encoding),
      encryptedData: encrypted.toString(this.encoding),
    };

    return encryptedResult;
  }

  decryptText(text: EncryptedText, key: string) {
    const iv = Buffer.from(text.iv, this.encoding);
    const encryptedText = Buffer.from(text.encryptedData, this.encoding);

    const decipher = crypto.createDecipheriv(
      this.cipher,
      Buffer.from(key, this.encoding),
      iv,
    );

    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  }
}
