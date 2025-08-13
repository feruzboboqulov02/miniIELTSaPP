import { useState } from 'react';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';

const sampleQuestions = [
  { _id: '1', text: 'What is the capital of France?', options: [
    { _id: '1a', text: 'Paris', isCorrect: true },
    { _id: '1b', text: 'London', isCorrect: false },
    { _id: '1c', text: 'Berlin', isCorrect: false },
    { _id: '1d', text: 'Madrid', isCorrect: false }
  ]},
  { _id: '2', text: 'Which planet is known as the Red Planet?', options: [
    { _id: '2a', text: 'Earth', isCorrect: false },
    { _id: '2b', text: 'Mars', isCorrect: true },
    { _id: '2c', text: 'Jupiter', isCorrect: false },
    { _id: '2d', text: 'Venus', isCorrect: false }
  ]},
  { _id: '3', text: 'Who wrote "Hamlet"?', options: [
    { _id: '3a', text: 'Charles Dickens', isCorrect: false },
    { _id: '3b', text: 'Leo Tolstoy', isCorrect: false },
    { _id: '3c', text: 'William Shakespeare', isCorrect: true },
    { _id: '3d', text: 'Mark Twain', isCorrect: false }
  ]},
  { _id: '4', text: 'What is the chemical symbol for water?', options: [
    { _id: '4a', text: 'O2', isCorrect: false },
    { _id: '4b', text: 'H2O', isCorrect: true },
    { _id: '4c', text: 'CO2', isCorrect: false },
    { _id: '4d', text: 'HO', isCorrect: false }
  ]},
  { _id: '5', text: 'What is the largest ocean on Earth?', options: [
    { _id: '5a', text: 'Atlantic Ocean', isCorrect: false },
    { _id: '5b', text: 'Indian Ocean', isCorrect: false },
    { _id: '5c', text: 'Pacific Ocean', isCorrect: true },
    { _id: '5d', text: 'Arctic Ocean', isCorrect: false }
  ]},
  { _id: '6', text: 'In which year did World War II end?', options: [
    { _id: '6a', text: '1945', isCorrect: true },
    { _id: '6b', text: '1939', isCorrect: false },
    { _id: '6c', text: '1918', isCorrect: false },
    { _id: '6d', text: '1950', isCorrect: false }
  ]},
  { _id: '7', text: 'Which gas do plants release during photosynthesis?', options: [
    { _id: '7a', text: 'Carbon Dioxide', isCorrect: false },
    { _id: '7b', text: 'Oxygen', isCorrect: true },
    { _id: '7c', text: 'Nitrogen', isCorrect: false },
    { _id: '7d', text: 'Hydrogen', isCorrect: false }
  ]},
  { _id: '8', text: 'What is the tallest mountain in the world?', options: [
    { _id: '8a', text: 'K2', isCorrect: false },
    { _id: '8b', text: 'Kangchenjunga', isCorrect: false },
    { _id: '8c', text: 'Mount Everest', isCorrect: true },
    { _id: '8d', text: 'Lhotse', isCorrect: false }
  ]},
  { _id: '9', text: 'Which element has the chemical symbol "Au"?', options: [
    { _id: '9a', text: 'Silver', isCorrect: false },
    { _id: '9b', text: 'Gold', isCorrect: true },
    { _id: '9c', text: 'Aluminum', isCorrect: false },
    { _id: '9d', text: 'Argon', isCorrect: false }
  ]},
  { _id: '10', text: 'Which country is known as the Land of the Rising Sun?', options: [
    { _id: '10a', text: 'China', isCorrect: false },
    { _id: '10b', text: 'Japan', isCorrect: true },
    { _id: '10c', text: 'Thailand', isCorrect: false },
    { _id: '10d', text: 'South Korea', isCorrect: false }
  ]}
];

const TestPage = () => {
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [timerRunning, setTimerRunning] = useState(true);

  const handleAnswerSelect = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = () => {
    setTimerRunning(false); // stop timer

    const detailedResults = sampleQuestions.map(q => {
      const correctOption = q.options.find(opt => opt.isCorrect);
      const userOptionId = answers[q._id];
      return {
        question: q.text,
        isCorrect: userOptionId === correctOption._id,
        correctAnswer: correctOption.text,
        userAnswer: q.options.find(o => o._id === userOptionId)?.text || 'No answer'
      };
    });

    setResults(detailedResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative">
      
      {/* Timer fixed at top-right */}
      <Timer onTimeUp={handleSubmit} running={timerRunning} />

      {/* Center container */}
      <div className="flex justify-center pt-28 pb-16">
        <div className="w-full max-w-4xl space-y-6">
          {results ? (
            results.map((r, i) => (
              <div key={i} className="p-6 rounded-2xl backdrop-blur-lg bg-white/20 shadow-lg border border-white/30">
                <h2 className="text-lg font-bold text-white mb-2">
                  Q{i+1}: {r.question}
                </h2>
                <p className="text-white">Your Answer: {r.userAnswer}</p>
                {r.isCorrect ? (
                  <p className="text-green-300 font-semibold">✅ Correct</p>
                ) : (
                  <p className="text-red-300 font-semibold">
                    ❌ Incorrect — Correct: {r.correctAnswer}
                  </p>
                )}
              </div>
            ))
          ) : (
            <>
              {sampleQuestions.map((question, index) => (
                <QuestionCard
                  key={question._id}
                  question={question}
                  questionNumber={index + 1}
                  selectedAnswer={answers[question._id]}
                  onAnswerSelect={handleAnswerSelect}
                />
              ))}
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(answers).length === 0}
                  className="px-8 py-3 rounded-lg font-semibold text-white bg-white/20 hover:bg-white/30 border border-white/40 shadow-lg backdrop-blur-lg transition-all disabled:opacity-50"
                >
                  Submit Test
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
