import { Router } from "express";
import { createSessionHandler, refreshAccessTokenHandler } from "../controllers/auth.controllers";
import validateResource from "../middlewares/validate.middlewares";
import { createSessionSchema } from "../schemas/auth.schemas";

const router = Router();

router.post("/api/sessions", validateResource(createSessionSchema), createSessionHandler);

router.post("/api/sessions/refresh", refreshAccessTokenHandler);

export default router;
