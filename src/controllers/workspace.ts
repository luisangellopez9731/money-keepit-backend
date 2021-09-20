import { Router } from "express";
import { WorkspaceService } from "../services/workspace";
import { getTokenInfo } from "utils";
import { JwtPayload } from "jsonwebtoken";
import { protect, protectWithoutWorkspace } from "middlewares/auth";

const router = Router();

router.post("/", protectWithoutWorkspace, async (req, res) => {
  const tokenInfo = await getTokenInfo(req.headers.authorization as string);
  const { id: userId } = tokenInfo;
  const { name, description } = req.body;
  res.send(await WorkspaceService.create({ userId, name, description }));
});

router.get("/", async (req, res, next) => {
  const data = await getTokenInfo(req.headers.authorization as string);

  const { id } = data as JwtPayload;
  res.send(await WorkspaceService.getAll(id));
});

export default router;
