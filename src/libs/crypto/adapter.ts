import { EncryptedText } from './types';
export abstract class ICryptoAdapter {
  abstract createHash(password: string): Promise<string>;
  abstract validateHash(password: string, hash: string): Promise<boolean>;
  abstract createKey(): string;
  abstract encryptText(text: string, key: string): EncryptedText;
  abstract decryptText(encryptedText: EncryptedText, key: string): string;
}
