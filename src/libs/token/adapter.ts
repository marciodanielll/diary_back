export abstract class ITokenAdapter {
  abstract createToken(payload: Record<string, string>): string;
  abstract decodeToken(data: string): Record<string, string> | string;
}
