import mongoose from "mongoose";

const FAQSchema = new mongoose.Schema({
  question: String,
  answer: String,
  embedding: [Number] // for AI matching later
});

export default mongoose.model("FAQ", FAQSchema);
