import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.AUTH_SECRET || "fallback-secret-change-me";
const JWT_EXPIRES_IN = "7d";
const JWT_REFRESH_EXPIRES_IN = "30d";

export interface JWTPayload {
  userId: string;
  email: string;
  roleId: string;
  roleName: string;
  type: "access" | "refresh";
}

export function signAccessToken(payload: Omit<JWTPayload, "type">): string {
  return jwt.sign({ ...payload, type: "access" }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function signRefreshToken(payload: Omit<JWTPayload, "type">): string {
  return jwt.sign({ ...payload, type: "refresh" }, JWT_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRES_IN,
  });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwt.decode(token) as JWTPayload;
  } catch {
    return null;
  }
}
