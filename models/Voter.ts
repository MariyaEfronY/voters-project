import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define the TypeScript Interface
export interface IVoter extends Document {
  name: string;
  phone: string;
  aadhar: string;
  dob: Date;
  address: string;
  gender: 'Male' | 'Female' | 'Other';
  voterId: string;
  createdAt: Date;
}

// 2. Define the Schema
const VoterSchema = new Schema<IVoter>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
    },
    aadhar: {
      type: String,
      required: [true, 'Aadhar number is required'],
      unique: true,
      trim: true,
    },
    dob: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
    },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['Male', 'Female', 'Other'],
      trim: true,
    },
    voterId: {
      type: String,
      required: [true, 'Voter ID is required'],
      unique: true,
      trim: true,
      uppercase: true, // Automatically converts voter ID to uppercase
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// 3. Export the Model
// This check prevents re-defining the model during Next.js hot reloads
const Voter: Model<IVoter> = mongoose.models.Voter || mongoose.model<IVoter>('Voter', VoterSchema);

export default Voter;