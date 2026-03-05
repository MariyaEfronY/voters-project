import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IVote extends Document {
  voter: mongoose.Types.ObjectId;
  nominee: mongoose.Types.ObjectId;
  createdAt: Date;
}

const VoteSchema = new Schema<IVote>(
  {
    voter: {
      type: Schema.Types.ObjectId,
      ref: 'Voter',
      required: true,
      unique: true, // Prevents duplicate voting
    },
    nominee: {
      type: Schema.Types.ObjectId,
      ref: 'Nominee',
      required: true,
    },
  },
  { timestamps: true }
);

const Vote: Model<IVote> = mongoose.models.Vote || mongoose.model<IVote>('Vote', VoteSchema);
export default Vote;