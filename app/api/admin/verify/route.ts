import { NextResponse } from "next/server";
import { adminAuth } from "@/middleware/adminAuth";

export async function GET(req: Request) {

  try {

    const admin = adminAuth(req);

    return NextResponse.json({
      message: "Authorized",
      admin
    });

  } catch {

    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );

  }

}