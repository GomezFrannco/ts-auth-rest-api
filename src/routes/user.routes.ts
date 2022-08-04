import { Router } from "express";
import { createUserHandler, forgotPasswordHandler, getCurrentUserHandler, resetPasswordHandler, verifyUserHandler } from "../controllers/user.controllers";
import requireUser from "../middlewares/require.middlewares";
import validateResource from "../middlewares/validate.middlewares";
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from "../schemas/user.schemas";

const router = Router();

router.post("/api/users", validateResource(createUserSchema), createUserHandler);

router.post("/api/users/verify/:id/:verificationCode", validateResource(verifyUserSchema), verifyUserHandler);

router.post("/api/users/forgotpassword",  validateResource(forgotPasswordSchema), forgotPasswordHandler);

router.post("/api/users/resetpassword/:id/:passwordResetCode", validateResource(resetPasswordSchema), resetPasswordHandler);

router.get("/api/users/me", requireUser ,getCurrentUserHandler);

export default router;
