import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Voter from '@/models/Voter';
import Vote from '@/models/Vote';
import Nominee from '@/models/Nominee';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { voterIdString, nomineeId } = body;

    // 1. Basic Validation
    if (!voterIdString || !nomineeId) {
      return NextResponse.json({ message: "Voter ID and Nominee are required" }, { status: 400 });
    }

    // 2. Find Voter (Case-Insensitive)
    const voter = await Voter.findOne({ 
      voterId: { $regex: new RegExp(`^${voterIdString.trim()}$`, 'i') } 
    });

    if (!voter) {
      return NextResponse.json({ message: "Voter ID not found" }, { status: 404 });
    }

    // 3. Check if already voted
    const existingVote = await Vote.findOne({ voter: voter._id });
    if (existingVote) {
      return NextResponse.json({ message: "You have already cast your vote!" }, { status: 400 });
    }

    // 4. Verify Nominee ID is valid and exists
    if (!mongoose.Types.ObjectId.isValid(nomineeId)) {
      return NextResponse.json({ message: "Invalid Nominee ID format" }, { status: 400 });
    }

    const nominee = await Nominee.findById(nomineeId);
    if (!nominee) {
      return NextResponse.json({ message: "Nominee not found" }, { status: 404 });
    }

    // 5. Save the Vote
    await Vote.create({
      voter: voter._id,
      nominee: new mongoose.Types.ObjectId(nomineeId),
    });

    return NextResponse.json({ 
      success: true, 
      message: `Successfully voted for ${nominee.name}` 
    }, { status: 201 });

  } catch (error: any) {
    console.error("VOTE_ERROR:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}