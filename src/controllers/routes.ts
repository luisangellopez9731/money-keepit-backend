import { Router } from "express";
import workSpaceController from "./workspaceController";
import usersController from "./usersController";

const router = Router();

router.use("/workspaces", workSpaceController);
router.use("/users", usersController);

export default router;
