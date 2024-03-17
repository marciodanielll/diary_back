import z from 'zod';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

import { diarySchema } from '../diary/types';

export const signUpSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.nativeEnum(Roles).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    isActivated: z.boolean().optional(),
    diaries: z.array(diarySchema).default([]),
  })
  .strict();

export const signInSchema = signUpSchema
  .pick({
    password: true,
    email: true,
  })
  .strict();

export type SingUp = z.infer<typeof signUpSchema>;

export type SignUpInput = Pick<SingUp, 'name' | 'email' | 'password'>;
export type SignUpOutput = { token: string; id: string };

export type SignInInput = Pick<SingUp, 'email' | 'password'>;
export type SignInOutput = { token: string; name: string };

export const userSchema = signUpSchema;
export type User = SingUp;
