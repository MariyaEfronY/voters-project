import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INominee extends Document {
  name: string;
  party: string;
  createdAt: Date;
}

const NomineeSchema = new Schema<INominee>(
  {
    name: {
      type: String,
      required: [true, 'Nominee name is required'],
      trim: true,
    },
    party: {
      type: String,
      required: [true, 'Party name is required'],
      trim: true,
    },
  },
  { timestamps: true }
);

const Nominee: Model<INominee> = 
  mongoose.models.Nominee || mongoose.model<INominee>('Nominee', NomineeSchema);

export default Nominee;