import { TypeOf } from "zod";
import { createUserSchema, verifyUserSchema } from "../schemas/user.schemas";

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"]

export type smptType = {
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
};
