import z from 'zod';

export const diarySchema = z
  .object({
    id: z.string().uuid(),
    iv: z.string(),
    encryptedData: z.string(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    encrypted_data: z.string(),
    userId: z.string().uuid(),
  })
  .strict();

export type Diary = z.infer<typeof diarySchema>;

export type DiaryCreateInput = { text: string; email: string };

export type DiaryCreateOutput = { id: string };
