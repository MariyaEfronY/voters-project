import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import { createToken } from "@/lib/auth";

export async function POST(req: Request) {

  await dbConnect();

  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = createToken(admin);

  return NextResponse.json({
    message: "Login successful",
    token
  });
}