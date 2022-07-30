import { TypeOf } from "zod";
import { createUserSchema } from "../schemas/user.schemas";

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];
