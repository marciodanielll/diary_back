import z from 'zod';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

export const userSchema = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.nativeEnum(Roles).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    isActivated: z.boolean().optional(),
  })
  .strict();

export type User = z.infer<typeof userSchema>;

export type UserCreateInput = User;
export type UserCreateOutput = { token: string; name: string };

export type UserLoginInput = Pick<User, 'email' | 'password'>;
export type UserLoginOutput = { token: string };
