import { Router } from "express";
import workSpaceController from "./workspaceController";
import usersController from "./usersController";
import authController from "./auth";
import {protect, protectWithoutWorkspace} from 'middlewares/auth'

const router = Router();

router.use("/workspaces", protectWithoutWorkspace, workSpaceController);
router.use("/users", usersController);
router.use("/auth", authController);

export default router;
