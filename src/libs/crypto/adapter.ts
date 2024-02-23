export abstract class ICryptoAdapter {
  abstract createHash(password: string): Promise<string>;
  abstract validateHash(password: string, hash: string): Promise<boolean>;
}
