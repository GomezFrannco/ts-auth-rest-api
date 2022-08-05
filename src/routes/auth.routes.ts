import { Router } from "express";
import PostAuthHandlers from "../controllers/auth.controllers";
import validateResource from "../middlewares/validate.middlewares";
import { createSessionSchema } from "../schemas/auth.schemas";

const router = Router();

router.post("/api/sessions", validateResource(createSessionSchema), PostAuthHandlers.createSessionHandler);

router.post("/api/sessions/refresh", PostAuthHandlers.refreshAccessTokenHandler);

export default router;
