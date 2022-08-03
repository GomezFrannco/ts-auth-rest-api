import { Request, Response } from "express";
import { createUser, findUserById } from "../services/user.services";
import { CreateUserInput, VerifyUserInput } from "../types/api.types";
import sendEmail from "../utils/mailer.utils";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
  const body = req.body;
  try {
    const user = await createUser(body);
    await sendEmail({
      from: 'test@example.com',
      to: user.email,
      subject: 'Verify your account',
      text: `Here is your verification code: ${user.verificationCode}\n ID: ${user._id}` 
    });
    return res.status(201).send("User created successfully!");
  } catch (e: any) {
    if (e.code == 11000) {
      return res.status(409).send("Account already exists!");
    }
    return res.status(500).send(e)
  }
}
