import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Nominee from '@/models/Nominee';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, party } = await request.json();

    if (!name || !party) {
      return NextResponse.json(
        { message: "Name and Party are required" },
        { status: 400 }
      );
    }

    const newNominee = await Nominee.create({ name, party });

    return NextResponse.json(
      { success: true, message: "Nominee added!", data: newNominee },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

// Optional: GET route to fetch all nominees
export async function GET() {
  try {
    await dbConnect();
    const nominees = await Nominee.find({});
    return NextResponse.json({ success: true, data: nominees });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}