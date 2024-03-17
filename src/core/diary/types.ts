import z from 'zod';

export const diarySchema = z
  .object({
    id: z.string().uuid(),
    iv: z.string().max(255),
    encryptedData: z.string(),
    userId: z.string().uuid(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    deletedAt: z.date().nullable().optional(),
  })
  .strict();

export const diaryCreateInputSchema = z.object({
  text: z.string().max(255),
  email: z.string().email(),
});

export type Diary = z.infer<typeof diarySchema>;

export type DiaryCreateInput = { text: string; email: string };

export type DiaryCreateOutput = { id: string };
