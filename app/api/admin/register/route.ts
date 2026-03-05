import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";

export async function POST(req: Request) {

  await dbConnect();

  const { name, email, password } = await req.json();

  const exists = await Admin.findOne({ email });

  if (exists) {
    return NextResponse.json(
      { message: "Admin already exists" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  const admin = await Admin.create({
    name,
    email,
    password: hashed
  });

  return NextResponse.json({
    message: "Admin created successfully",
    admin
  });
}