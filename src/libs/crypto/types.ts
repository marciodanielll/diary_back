export type EncryptedText = {
  iv: string;
  encryptedData: string;
};

export const encodingsTuple = [
  'ascii',
  'utf8',
  'utf16le',
  'ucs2',
  'base64',
  'latin1',
  'binary',
  'hex',
] as const;
