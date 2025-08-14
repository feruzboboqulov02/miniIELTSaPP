import { Router } from 'express';
import { getTestQuestions, submitTest } from '../controllers/testController.js';

const router = Router();

// GET /api/test - Get randomized questions for test (no correct answers)
router.get('/', getTestQuestions);

// POST /api/test/submit - Submit test answers and get results
router.post('/submit', submitTest);

export default router;
