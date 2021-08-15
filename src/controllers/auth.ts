import { Router } from "express";
import { AuthService } from "../services/auth";
import { getTokenFromAuthorizationHeader, verifyToken } from "utils";
import { JwtPayload } from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let login;

  if (authorizationHeader) {
    const token = getTokenFromAuthorizationHeader(
      req.headers.authorization as string
    );
    const valid = verifyToken(token);
    if (!valid) {
      res.status(400).send("El token no es valido");
      return;
    }

    const decoded = valid as JwtPayload;

    login = await AuthService.doLoginWithWorkspace(
      decoded.username,
      req.body.workspaceId
    );
  } else {
    login = await AuthService.doLogin(req.body);
  }
  if (typeof login == "string") {
    res.send({ token: login });
  } else {
    const { status, message } = login;
    if (status != 500) {
      res.status(status).send(message);
    } else {
      next(message);
    }
  }
});

export default router;
