import { Router } from "express";
import workSpaceController from "./workspaceController";

const router = Router();

router.use("/workspaces", workSpaceController);

export default router;
