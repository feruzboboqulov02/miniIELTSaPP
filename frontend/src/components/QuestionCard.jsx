const QuestionCard = ({ question, questionNumber, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Question {questionNumber}: {question.text}
      </h3>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <label
            key={option._id}
            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedAnswer === option._id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name={`question-${question._id}`}
              value={option._id}
              checked={selectedAnswer === option._id}
              onChange={() => onAnswerSelect(question._id, option._id)}
              className="mr-3 text-blue-600"
            />
            <span className="text-gray-700">{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;