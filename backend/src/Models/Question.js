import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [{ text: String, isCorrect: Boolean }]
});

export default mongoose.model("Question", questionSchema);
