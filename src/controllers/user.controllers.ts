import { Request, Response } from "express";
import { nanoid } from "nanoid";
import UserServices from "../services/user.services";
import { CreateUserInput, ForgotPasswordInput, ResetPasswordInput, VerifyUserInput } from "../types/api.types";
import sendEmail from "../utils/mailer.utils";

export class PostUsersHandlers {
  static async createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body;
    try {
      const user = await UserServices.createUser(body);
      await sendEmail({
        from: "test@example.com",
        to: user.email,
        subject: "Verify your account",
        text: `Here is your verification code: ${user.verificationCode}\n ID: ${user._id}`,
      });
      return res.status(201).send("User created successfully");
    } catch (e: any) {
      if (e.code == 11000) {
        return res.status(409).send("Account already exists!");
      }
      return res.status(500).send(e);
    }
  }
  static async verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;
    try {
      const user = await UserServices.findUserById(id);
      if (!user) {
        return res.status(404).send("Could not found a user to verify!");
      }
      if (user.verified) {
        return res.status(200).send("User already verified!");
      }
      if (user.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();
        return res.status(201).send("User verified!");
      }
      return res.status(500).send("Could not verify user");
    } catch (e: any) {
      return res.status(500).send(e);
    }
  }
  static async forgotPasswordHandler(req: Request<{},{}, ForgotPasswordInput>, res: Response) {
    const { email } = req.body;
    try {
      const user = await UserServices.findUserByEmail(email);
      if(!user) {
        return res.send('No user registered with that email');
      }
      if(!user.verified) {
        return res.send('User is not verified');
      }
      const passwordResetCode = nanoid();
      user.passwordResetCode = passwordResetCode;
      await user.save();
      await sendEmail({
      from: 'test@example.com',
      to: user.email,
      subject: 'Reset your password',
      text: `Here is your password reset code: ${passwordResetCode}\n ID: ${user._id}`, 
      })
      return res.status(200).send('Email was sent successfully. Please check your email inbox')
    } catch (e) {
      return res.status(500).send(e)
    }
  }
  static async resetPasswordHandler (req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>, res: Response) {
    const { id, passwordResetCode } = req.params;
    const { password } = req.body;
    try {
      const user = await UserServices.findUserById(id);
      if(!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
        return res.status(400).send('Could not reset user password')
      } 
        user.passwordResetCode = null;
        user.password = password;
        await user.save();
      return res.status(200).send('succesfully updated password');
    } catch (e) {
      return res.status(500).send(e)
    }
  }
}

export class GetUsersHandlers {
  static async getCurrentUserHandler(_req: Request, res: Response) {
    return res.status(200).send(res.locals.user)
  }
}