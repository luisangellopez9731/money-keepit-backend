import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
import { getTokenInfo } from "utils";

export const protectWithoutWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(400).send("no Authorization Header provided");
    return;
  }

  const decoded = await getTokenInfo(authorizationHeader);

  if (!decoded) {
    res.status(400).send("Token is not valid");
    return;
  }

  next();
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    res.status(400).send("no Authorization Header provided");
    return;
  }

  const decoded = await getTokenInfo(authorizationHeader);

  if (!decoded) {
    res.status(400).send("Token is not valid");
    return;
  }

  if (!(decoded as JwtPayload).workspace) {
    res.status(400).send("no workspace in token data, try to login again");
    return;
  }

  next();
};
