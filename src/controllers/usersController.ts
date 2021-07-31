import { Router } from "express";
import { UserService } from "../services/userService";

const router = Router();

// router.get("/", async(req, res) => {
//   res.send(await UserService.getAll());
// });

router.get("/:id", async(req, res) => {
  const id = req.query.id as string;
  res.send(await UserService.get(id));
});

router.post("/", async(req, res) => {
  const { body } = req;
  res.send(await UserService.create(body));
});

export default router;
