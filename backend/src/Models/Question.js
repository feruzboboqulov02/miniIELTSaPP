import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true, default: false }
  },
  { _id: true }
);

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: {
    type: [optionSchema],
    validate: [arr => arr.length === 4, 'Exactly 4 options required']
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Question', questionSchema);
