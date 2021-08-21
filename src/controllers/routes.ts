import { Router } from "express";
import workSpace from "./workspace";
import users from "./users";
import auth from "./auth";
import { protect, protectWithoutWorkspace } from "middlewares/auth";

const router = Router();

router.use("/workspaces", protectWithoutWorkspace, workSpace);
router.use("/users", users);
router.use("/auth/", auth);

export default router;
