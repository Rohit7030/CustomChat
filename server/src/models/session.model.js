import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  sessionId: String,
  messages: [
    {
      role: { type: String, enum: ["user", "assistant", "system"], required: true },
      content: String
    }
  ]
}, { timestamps: true });

export default mongoose.model("Session", SessionSchema);
