import { Router } from "express";
import { createUserHandler, forgotPasswordHandler, verifyUserHandler } from "../controllers/user.controllers";
import validateResource from "../middlewares/validate.middlewares";
import { createUserSchema, forgotPasswordSchema, verifyUserSchema } from "../schemas/user.schemas";

const router = Router();

router.post("/api/users", validateResource(createUserSchema), createUserHandler);

router.post("/api/users/verify/:id/:verificationCode", validateResource(verifyUserSchema), verifyUserHandler);

router.post("/api/users/forgotpassword",  validateResource(forgotPasswordSchema), forgotPasswordHandler);

export default router;
