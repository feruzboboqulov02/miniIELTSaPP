import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Question from '../Models/Question.js';

async function run() {
  await connectDB();
  await Question.deleteMany({});
  await Question.insertMany([
    {
      text: 'Choose the correct word: She ___ to the store yesterday.',
      options: [
        { text: 'go', isCorrect: false },
        { text: 'goes', isCorrect: false },
        { text: 'went', isCorrect: true },
        { text: 'gone', isCorrect: false }
      ]
    },
    {
      text: 'Find the synonym of "rapid".',
      options: [
        { text: 'slow', isCorrect: false },
        { text: 'quick', isCorrect: true },
        { text: 'late', isCorrect: false },
        { text: 'weak', isCorrect: false }
      ]
    }
  ]);
  console.log('Seeded');
  await mongoose.disconnect();
}
run();
