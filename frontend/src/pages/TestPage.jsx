import { useState, useEffect, useMemo } from 'react';
import { getTestQuestions, submitTest } from '../api';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';

const normalize = (raw) =>
  raw.map(q => ({
    id: q.id || q._id,
    text: q.text,
    options: (q.options || []).map(o => ({
      id: o.id || o._id,
      text: o.text
    }))
  }));

const TestPage = ({ onTestComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getTestQuestions();
        setQuestions(normalize(res.data));
        setError(null);
      } catch (e) {
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAnswerSelect = (questionId, optionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const answeredCount = useMemo(
    () => questions.filter(q => !!answers[q.id]).length,
    [answers, questions]
  );
  const allAnswered = answeredCount === questions.length;

  const handleSubmit = async () => {
    if (submitting || answeredCount === 0) return;
    setSubmitting(true);
    try {
      const payload = Object.entries(answers).map(([questionId, optionId]) => ({ questionId, optionId }));
      const res = await submitTest(payload);
      onTestComplete ? onTestComplete(res.data) : alert(`Score: ${res.data.percent}%`);
    } catch (e) {
      setError('Failed to submit test. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTimeUp = () => {
    if (!submitting) handleSubmit();
  };

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 rounded-full border-2 border-slate-900 border-t-transparent mx-auto" />
          <p className="mt-4 text-slate-600">Loading questions…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="bg-white shadow rounded-2xl p-6 w-full max-w-md text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => location.reload()}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">IELTS Mock Test</h1>
            <p className="text-slate-600">
              Progress: {answeredCount} of {questions.length} questions answered
            </p>
          </div>
          <Timer onTimeUp={handleTimeUp} />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            questionNumber={i + 1}
            selectedAnswer={answers[q.id]}
            onAnswerSelect={handleAnswerSelect}
          />
        ))}

        <div className="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            {allAnswered ? 'All questions answered!' : `${questions.length - answeredCount} questions remaining`}
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting || answeredCount === 0}
            className={`px-6 py-2 rounded-xl font-medium transition
              ${submitting || answeredCount === 0
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : allAnswered
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
          >
            {submitting ? 'Submitting…' : 'Submit Test'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default TestPage;
