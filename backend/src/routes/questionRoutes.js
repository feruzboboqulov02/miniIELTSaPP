import { Router } from 'express';
import {
  getQuestions,
  getQuestion,
  createQuestion,
  updateQuestion,
  deleteQuestion
} from '../controllers/questionController.js';

const router = Router();

// GET /api/questions - Get all questions (Admin)
router.get('/', getQuestions);

// GET /api/questions/:id - Get single question (Admin)
router.get('/:id', getQuestion);

// POST /api/questions - Create new question (Admin)
router.post('/', createQuestion);

// PUT /api/questions/:id - Update question (Admin)
router.put('/:id', updateQuestion);

// DELETE /api/questions/:id - Delete question (Admin)
router.delete('/:id', deleteQuestion);

export default router;
