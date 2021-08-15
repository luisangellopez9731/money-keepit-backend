import { Router } from "express";
import { WorkspaceService } from "../services/workspace";
import { getTokenInfo } from "utils";
import { JwtPayload } from "jsonwebtoken";

const router = Router();

router.post("/", (req, res) => {
  res.send(WorkspaceService.create(req.body));
});

router.get("/", async (req, res, next) => {
  const data = await getTokenInfo(req.headers.authorization as string);
  const username = (data as JwtPayload).username;
  res.send(await WorkspaceService.getAll(username));
});

export default router;
