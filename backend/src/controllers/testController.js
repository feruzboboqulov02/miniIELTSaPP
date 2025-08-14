import Question from '../Models/Question.js';

// @desc    Get randomized questions for a test (without correct answers)
// @route   GET /api/test
// @access  Public
export const getTestQuestions = async (req, res) => {
  try {
    // Get all questions and randomize their order
    const questions = await Question.find();
    
    if (questions.length === 0) {
      return res.status(404).json({ error: 'No questions available' });
    }

    // Shuffle the questions for a random order
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

    // Remove correct answer information before sending to the client
    const testQuestions = shuffledQuestions.map(question => ({
      _id: question._id,
      text: question.text,
      options: question.options.map(option => ({
        _id: option._id,
        text: option.text
      }))
    }));

    res.json(testQuestions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Submit test answers and get results
// @route   POST /api/test/submit
// @access  Public
export const submitTest = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ 
        error: 'Answers array is required and cannot be empty' 
      });
    }

    // Validate the format of the answers
    for (const answer of answers) {
      if (!answer.questionId || !answer.optionId) {
        return res.status(400).json({ 
          error: 'Each answer must have questionId and optionId' 
        });
      }
    }

    // Get the questions from the database to check the answers
    const questionIds = answers.map(a => a.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    if (questions.length !== answers.length) {
      return res.status(400).json({ 
        error: 'Some questions were not found' 
      });
    }

    // Calculate the test results
    let correctCount = 0;
    const breakdown = [];

    for (const answer of answers) {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      
      if (!question) {
        return res.status(400).json({ 
          error: `Question ${answer.questionId} not found` 
        });
      }

      // Find the correct and chosen options
      const correctOption = question.options.find(opt => opt.isCorrect);
      const chosenOption = question.options.find(opt => opt._id.toString() === answer.optionId);

      if (!chosenOption) {
        return res.status(400).json({ 
          error: `Invalid option ${answer.optionId} for question ${answer.questionId}` 
        });
      }

      // Check if the chosen answer is correct
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
