import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Vote from "@/models/Vote";
import Voter from "@/models/Voter";
import Nominee from "@/models/Nominee";

const MONGO_URI = process.env.MONGO_URI!;

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
  }
}

export async function GET() {
  try {
    await connectDB();

    const votes = await Vote.find()
      .populate({
        path: "voter",
        model: Voter,
        select: "name phone voterId",
      })
      .populate({
        path: "nominee",
        model: Nominee,
        select: "name party",
      })
      .sort({ createdAt: -1 });

    return NextResponse.json(votes);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching votes" },
      { status: 500 }
    );
  }
}