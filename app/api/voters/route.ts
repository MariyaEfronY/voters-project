import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Voter from '@/models/Voter';

export async function POST(request: Request) {
  try {
    console.log("--- API START ---");
    await dbConnect();
    console.log("DB Connected Successfully");

    const body = await request.json();
    console.log("Request Body:", body);

    // Generate ID
    const generatedVoterId = `VOTER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const newVoter = await Voter.create({
      ...body,
      voterId: generatedVoterId
    });

    console.log("Voter Created:", newVoter._id);
    return NextResponse.json({ success: true, data: newVoter }, { status: 201 });

  } catch (error: any) {
    // THIS LOG WILL APPEAR IN YOUR TERMINAL
    console.error("CRITICAL API ERROR:", error.message); 
    
    return NextResponse.json(
      { success: false, message: error.message }, 
      { status: 500 }
    );
  }
}