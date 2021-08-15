import { Router } from "express";
import { UserService } from "../services/user";

const router = Router();

router.post("/", async(req, res) => {
  const { body } = req;
  res.send(await UserService.create(body));
});

export default router;
