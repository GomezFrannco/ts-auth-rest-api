import { TypeOf } from "zod";
import { createSessionSchema } from "../schemas/auth.schemas";
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from "../schemas/user.schemas";

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];

export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;

export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"];

export type smptType = {
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
};
