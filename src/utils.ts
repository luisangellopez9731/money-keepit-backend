import { hash as hashBCrypt, compare as compareBCrypt } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export const hash = async (value: string) => {
  return await hashBCrypt(value, 10);
};

export const compare = async (unHashed: string, hashed: string) => {
  return compareBCrypt(unHashed, hashed);
};

export const generateToken = async (data: any) => {
  return await sign(data, "secret", { expiresIn: "30d" });
};

export const verifyToken = async (token: string) => {
  try {
    return verify(token, "secret");
  } catch (err) {
    return null;
  }
};

export const getTokenFromAuthorizationHeader = (
  authorizationHeader: string
) => {
  return authorizationHeader.replace("Bearer ", "");
};

export const getTokenInfo = async (authorizationHeader: string) => {
  const token = getTokenFromAuthorizationHeader(authorizationHeader);
  const decoded = await verifyToken(token);
  if (!decoded) {
    throw { status: 400, message: "token invalido" };
  }

  return decoded as JwtPayload;
};

export function getEnumNumberValues<T extends string | number>(e: any): T[] {
  return typeof e === "object"
    ? (Object.values(e) as any[]).filter(
        (e: string | number) => typeof e === "number"
      )
    : [];
}
