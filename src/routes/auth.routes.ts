import { Router } from "express";
import { createSessionHandler } from "../controllers/auth.controllers";
import validateResource from "../middlewares/validate.middlewares";
import { createSessionSchema } from "../schemas/auth.schemas";

const router = Router();

router.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler);

export default router;
