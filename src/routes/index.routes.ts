import { Router } from "express";
import user from "./user.routes";
import auth from "./auth.routes";

const router = Router();

router.use(user);
router.use(auth);

export default router;
