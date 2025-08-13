import { useState, useEffect } from 'react';
import { getTestQuestions, submitTest } from '../api';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';

const TestPage = ({ onTestComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await getTestQuestions();
      setQuestions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, optionId]) => ({
        questionId,
        optionId
      }));

      const response = await submitTest(formattedAnswers);
      onTestComplete(response.data);
    } catch (err) {
      setError('Failed to submit test. Please try again.');
      setSubmitting(false);
    }
  };

  const handleTimeUp = () => {
    if (!submitting) {
      handleSubmit();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={loadQuestions}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === questions.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">IELTS Mock Test</h1>
              <p className="text-gray-600">
                Progress: {answeredCount} of {questions.length} questions answered
              </p>
            </div>
            <Timer onTimeUp={handleTimeUp} />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-6">
          {questions.map((question, index) => (
            <QuestionCard
              key={question._id}
              question={question}
              questionNumber={index + 1}
              selectedAnswer={answers[question._id]}
              onAnswerSelect={handleAnswerSelect}
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {allAnswered ? 'All questions answered!' : `${questions.length - answeredCount} questions remaining`}
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitting || answeredCount === 0}
              className={`px-8 py-3 rounded-lg font-semibold ${
                submitting || answeredCount === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : allAnswered
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Test'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;