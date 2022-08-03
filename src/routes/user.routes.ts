import { Router } from "express";
import { createUserHandler, verifyUserHandler } from "../controllers/user.controllers";
import validateResource from "../middlewares/validate.middlewares";
import { createUserSchema, verifyUserSchema } from "../schemas/user.schemas";

const router = Router();

router.post("/api/users", validateResource(createUserSchema), createUserHandler);

router.post("/api/users/verify/:id/:verificationCode", validateResource(verifyUserSchema), verifyUserHandler);

export default router;
