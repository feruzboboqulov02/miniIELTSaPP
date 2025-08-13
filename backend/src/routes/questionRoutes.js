import { Router } from 'express';
import {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion
} from '../controllers/questionController.js';

const router = Router();

router.post('/', createQuestion);
router.get('/', getQuestions);
router.get('/:id', getQuestion);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
