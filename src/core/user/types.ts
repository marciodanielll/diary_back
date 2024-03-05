import z from 'zod';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

export const singUpSchema = z
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

export type SingUp = z.infer<typeof singUpSchema>;

export type SignUpInput = SingUp;
export type SignUpOutput = { token: string };

export type SignInInput = Pick<SingUp, 'email' | 'password'>;
export type SignInOutput = { token: string; name: string };

export const userSchema = singUpSchema;
export type User = SingUp;
