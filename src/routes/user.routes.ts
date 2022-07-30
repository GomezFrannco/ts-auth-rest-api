import { Router } from "express";
import { createUserHandler } from "../controllers/user.controllers";
import validateResource from "../middlewares/validate.middlewares";
import { createUserSchema } from "../schemas/user.schemas";

const router = Router();

router.post("/api/users", validateResource(createUserSchema), createUserHandler);

export default router;
