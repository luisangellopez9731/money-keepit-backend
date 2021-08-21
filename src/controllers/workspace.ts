import { Router } from "express";
import { WorkspaceService } from "../services/workspace";
import { getTokenInfo } from "utils";
import { JwtPayload } from "jsonwebtoken";
import { protect, protectWithoutWorkspace } from "middlewares/auth";

const router = Router();

router.post("/", async (req, res) => {
  const tokenInfo = await getTokenInfo(req.headers.authorization as string);
  const { id: userId } = tokenInfo;
  const { name, description } = req.body;
  res.send(WorkspaceService.create({ userId, name, description }));
});

router.get("/", async (req, res, next) => {
  const data = await getTokenInfo(req.headers.authorization as string);
  const username = (data as JwtPayload).username;
  res.send(await WorkspaceService.getAll(username));
});

export default router;
