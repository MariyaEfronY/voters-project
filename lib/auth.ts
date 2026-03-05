import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function createToken(admin: any) {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      role: admin.role
    },
    SECRET,
    { expiresIn: "1d" }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}