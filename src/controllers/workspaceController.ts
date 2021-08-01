import { Router } from "express";
import { WorkspaceService } from "../services/workspace";

const router = Router();

router.post("/", (req, res) => {
  res.send(WorkspaceService.create(req.body));
});

export default router;
