import { Router } from "express";
import { PostUsersHandlers, GetUsersHandlers} from "../controllers/user.controllers";
import requireUser from "../middlewares/require.middlewares";
import validateResource from "../middlewares/validate.middlewares";
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from "../schemas/user.schemas";

const router = Router();

router.post("/api/users", validateResource(createUserSchema), PostUsersHandlers.createUserHandler);

router.post("/api/users/verify/:id/:verificationCode", validateResource(verifyUserSchema), PostUsersHandlers.verifyUserHandler);

router.post("/api/users/forgotpassword",  validateResource(forgotPasswordSchema), PostUsersHandlers.forgotPasswordHandler);

router.post("/api/users/resetpassword/:id/:passwordResetCode", validateResource(resetPasswordSchema), PostUsersHandlers.resetPasswordHandler);

router.get("/api/users/me", requireUser, GetUsersHandlers.getCurrentUserHandler);

export default router;
