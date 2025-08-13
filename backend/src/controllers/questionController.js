import Question from '../Models/Question.js';

export async function createQuestion(req, res, next) {
  try {
    const { text, options } = req.body;
    if (!text || !Array.isArray(options) || options.length !== 4) {
      return res.status(400).json({ error: 'Provide text and 4 options' });
    }
    const correctCount = options.filter(o => o.isCorrect).length;
    if (correctCount !== 1) {
      return res.status(400).json({ error: 'Exactly one option must be isCorrect:true' });
    }
    const q = await Question.create({ text, options });
    res.status(201).json(q);
  } catch (e) { next(e); }
}

export async function getQuestions(_req, res, next) {
  try {
    const items = await Question.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (e) { next(e); }
}

export async function getQuestion(req, res, next) {
  try {
    const q = await Question.findById(req.params.id);
    if (!q) return res.status(404).json({ error: 'Not found' });
    res.json(q);
  } catch (e) { next(e); }
}

export async function updateQuestion(req, res, next) {
  try {
    const { text, options } = req.body;
    const q = await Question.findByIdAndUpdate(
      req.params.id,
      { ...(text && { text }), ...(options && { options }) },
      { new: true, runValidators: true }
    );
    if (!q) return res.status(404).json({ error: 'Not found' });
    if (options) {
      const correctCount = q.options.filter(o => o.isCorrect).length;
      if (correctCount !== 1) {
        return res.status(400).json({ error: 'Exactly one option must be isCorrect:true' });
      }
    }
    res.json(q);
  } catch (e) { next(e); }
}

export async function deleteQuestion(req, res, next) {
  try {
    const q = await Question.findByIdAndDelete(req.params.id);
    if (!q) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: true });
  } catch (e) { next(e); }
}
