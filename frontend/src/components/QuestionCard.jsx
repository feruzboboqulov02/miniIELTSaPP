const QuestionCard = ({ question, questionNumber, selectedAnswer, onAnswerSelect }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-slate-200">
      <h3 className="text-lg font-semibold mb-4">
        Question {questionNumber}: {question.text}
      </h3>

      <div className="grid gap-2">
        {question.options.map(opt => {
          const checked = selectedAnswer === opt.id;
          return (
            <label
              key={opt.id}
              className={`flex items-center gap-3 p-3 rounded-xl border transition
                ${checked ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                value={opt.id}
                checked={checked}
                onChange={() => onAnswerSelect(question.id, opt.id)}
                className="h-4 w-4 accent-slate-900"
              />
              <span>{opt.text}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
