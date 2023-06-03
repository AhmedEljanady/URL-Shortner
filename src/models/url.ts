import mongoose, { Document } from "mongoose";

interface IURL extends Document {
  shortId: string;
  redirectURL: string;
  visitHistory: { timestamp: number }[];
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema = new mongoose.Schema<IURL>(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

export default mongoose.model<IURL>("URL", urlSchema);
