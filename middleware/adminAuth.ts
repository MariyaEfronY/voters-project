import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function adminAuth(req: NextRequest) {

  const token = req.cookies.get("adminToken")?.value;

  if (!token) {
    throw new Error("No token");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  return decoded;
}