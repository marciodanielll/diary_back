import z from 'zod';

export const diarySchema = z
  .object({
    id: z.string().uuid(),
    iv: z.string(),
    encryptedData: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  })
  .strict();
