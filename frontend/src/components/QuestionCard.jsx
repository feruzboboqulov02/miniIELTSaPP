const QuestionCard = ({ question, questionNumber, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="p-6 rounded-2xl backdrop-blur-lg bg-white/20 shadow-lg border border-white/30">
      <h3 className="text-lg font-semibold mb-4 text-white">
        Question {questionNumber}: {question.text}
      </h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label
            key={option._id}
            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
              selectedAnswer === option._id
                ? 'border-indigo-400 bg-indigo-200/30'
                : 'border-white/40 hover:border-white/60 hover:bg-white/10'
            }`}
          >
            <input
              type="radio"
              name={`question-${question._id}`}
              value={option._id}
              checked={selectedAnswer === option._id}
              onChange={() => onAnswerSelect(question._id, option._id)}
              className="mr-3 text-indigo-600"
            />
            <span className="text-white">{String.fromCharCode(65 + index)}. {option.text}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
