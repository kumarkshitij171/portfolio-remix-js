import jwt from "jsonwebtoken";

type UserPayload = {
  id: string;
  email: string;
  name: string;
};

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "7d";

export async function createJWT(user: UserPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      user,
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      },
      (err, token) => {
        if (err) return reject(err);
        if (!token) return reject(new Error("Failed to generate token"));
        resolve(token);
      }
    );
  });
}

export async function verifyJWT(token: string): Promise<UserPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);
      if (!decoded || typeof decoded !== "object") {
        return reject(new Error("Invalid token format"));
      }
      resolve(decoded as UserPayload);
    });
  });
}

export function getTokenFromHeader(request: Request): string | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) return null;
  
  const match = authHeader.match(/Bearer\s+(\S+)$/);
  return match ? match[1] : null;
}

export async function getUserFromRequest(request: Request): Promise<UserPayload | null> {
  try {
    const token = getTokenFromHeader(request);
    if (!token) return null;
    
    const user = await verifyJWT(token);
    return user;
  } catch (error) {
    console.error("JWT verification error:", error);
    return null;
  }
}