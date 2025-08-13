import { Router } from 'express';
import Question from '../Models/Question.js';

const router = Router();

function shuffle(arr) {
  return arr
    .map(v => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map(x => x.v);
}

// GET /api/test → return randomized questions (without correct flags)
router.get('/', async (_req, res, next) => {
  try {
    const questions = await Question.find({}, { text: 1, options: 1 });
    const shuffled = shuffle(questions).map(q => ({
      id: q._id.toString(),
      text: q.text,
      options: q.options.map(o => ({ id: o._id.toString(), text: o.text })) 
    }));
    res.json(shuffled);
  } catch (e) { next(e); }
});

// POST /api/test/submit → score answers

router.post('/submit', async (req, res, next) => {
  try {
    const { answers } = req.body;
    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: 'answers must be an array' });
    }
    const ids = answers.map(a => a.questionId);
    const questions = await Question.find({ _id: { $in: ids } });
    const byId = new Map(questions.map(q => [q._id.toString(), q]));

    let correct = 0;
    const breakdown = answers.map(a => {
      const q = byId.get(a.questionId);
      if (!q) return { questionId: a.questionId, correct: false };

      const correctOption = q.options.find(o => o.isCorrect);
      const isCorrect = correctOption && correctOption._id.toString() === a.optionId;
      if (isCorrect) correct++;

      return {
        questionId: a.questionId,
        chosenOptionId: a.optionId,
        correctOptionId: correctOption?._id.toString(),
        correct: Boolean(isCorrect)
      };
    });

    const total = answers.length || 0;
    const percent = total ? Math.round((correct / total) * 100) : 0;

    res.json({ correct, total, percent, breakdown });
  } catch (e) { next(e); }
});

export default router;
