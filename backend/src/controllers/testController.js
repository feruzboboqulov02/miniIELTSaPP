const Question = require('../Models/Question');

// GET /api/test - Get randomized questions for test (no correct answers shown)
const getTestQuestions = async (req, res) => {
  try {
    // Get all questions and randomize order
    const questions = await Question.find();
    
    if (questions.length === 0) {
      return res.status(404).json({ error: 'No questions available' });
    }

    // Shuffle questions for random order
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    // Remove correct answer information - only send text and _id for options
    const testQuestions = shuffledQuestions.map(question => ({
      _id: question._id,
      text: question.text,
      options: question.options.map(option => ({
        _id: option._id,
        text: option.text
        // Don't include isCorrect in test questions
      }))
    }));

    res.json(testQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/test/submit - Submit test answers and get results
const submitTest = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ 
        error: 'Answers array is required and cannot be empty' 
      });
    }

    // Validate answer format
    for (const answer of answers) {
      if (!answer.questionId || !answer.optionId) {
        return res.status(400).json({ 
          error: 'Each answer must have questionId and optionId' 
        });
      }
    }

    // Get all questions to check answers
    const questionIds = answers.map(a => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    if (questions.length !== answers.length) {
      return res.status(400).json({ 
        error: 'Some questions not found' 
      });
    }

    // Calculate results
    let correctCount = 0;
    const breakdown = [];

    for (const answer of answers) {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      
      if (!question) {
        return res.status(400).json({ 
          error: `Question ${answer.questionId} not found` 
        });
      }

      // Find the correct option
      const correctOption = question.options.find(opt => opt.isCorrect);
      const chosenOption = question.options.find(opt => opt._id.toString() === answer.optionId);

      if (!chosenOption) {
        return res.status(400).json({ 
          error: `Invalid option ${answer.optionId} for question ${answer.questionId}` 
        });
      }

      const isCorrect = correctOption._id.toString() === answer.optionId;
      if (isCorrect) correctCount++;

      breakdown.push({
        questionId: answer.questionId,
        questionText: question.text,
        chosenOptionId: answer.optionId,
        chosenOptionText: chosenOption.text,
        correctOptionId: correctOption._id.toString(),
        correctOptionText: correctOption.text,
        correct: isCorrect
      });
    }

    const totalQuestions = answers.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const result = {
      correct: correctCount,
      total: totalQuestions,
      percent: percentage,
      breakdown: breakdown
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTestQuestions,
  submitTest
};