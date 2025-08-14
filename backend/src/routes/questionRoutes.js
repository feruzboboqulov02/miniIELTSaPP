const express = require('express');
const router = express.Router();
const {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
} = require('../controllers/questionController');

// GET /api/questions - Get all questions (Admin)
router.get('/', getAllQuestions);

// GET /api/questions/:id - Get single question (Admin)
router.get('/:id', getQuestionById);

// POST /api/questions - Create new question (Admin)
router.post('/', createQuestion);

// PUT /api/questions/:id - Update question (Admin)
router.put('/:id', updateQuestion);

// DELETE /api/questions/:id - Delete question (Admin)
router.delete('/:id', deleteQuestion);

module.exports = router;