import { Router } from "express";
import { AuthService } from "../services/auth";
import {
  getTokenFromAuthorizationHeader,
  verifyToken,
  getTokenInfo,
} from "utils";
import { JwtPayload } from "jsonwebtoken";
import { protect, protectWithoutWorkspace } from "middlewares/auth";

const router = Router();

router.post("/login-for-workspace", async (req, res, next) => {
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

// TODO
router.post("/login", protectWithoutWorkspace, async (req, res, next) => {
  console.log('login')
  const authorizationHeader = req.headers.authorization;
  let login;

  if (authorizationHeader) {
    const token = getTokenFromAuthorizationHeader(
      req.headers.authorization as string
    );
    const valid = await verifyToken(token);
    if (!valid) {
      res.status(400).send("El token no es valido");
      return;
    }

    const decoded = valid as JwtPayload;
    console.log(decoded)
    login = await AuthService.doLoginWithWorkspace(
      decoded.id,
      req.body.workspaceId
    );
  } else {
    res.status(400).send("No authorization Header");
    return;
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
