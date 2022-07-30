import { TypeOf } from "zod";
import { createUserSchema } from "../schemas/user.schemas";

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type smptType = {
  user: string;
  pass: string;
  host: string;
  port: number;
  secure: boolean;
};
