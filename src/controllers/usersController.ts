import { Router } from "express";
import { UserService } from "../services/userService";

const router = Router();

router.get("/", (req, res) => {
  res.send(UserService.getAll());
});

export default router;
