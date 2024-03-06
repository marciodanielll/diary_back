import z from 'zod';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

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
  })
  .strict();

export const signInSchema = signUpSchema.pick({
  password: true,
  email: true,
});

export type SingUp = z.infer<typeof signUpSchema>;

export type SignUpInput = SingUp;
export type SignUpOutput = { token: string };

export type SignInInput = Pick<SingUp, 'email' | 'password'>;
export type SignInOutput = { token: string; name: string };

export const userSchema = signUpSchema;
export type User = SingUp;
