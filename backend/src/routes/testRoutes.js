const express = require('express');
const router = express.Router();
const { getTestQuestions, submitTest } = require('../controllers/testController');

// GET /api/test - Get randomized questions for test (no correct answers)
router.get('/', getTestQuestions);

// POST /api/test/submit - Submit test answers and get results
router.post('/submit', submitTest);

module.exports = router;