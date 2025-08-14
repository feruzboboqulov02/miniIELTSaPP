import { useState, useEffect } from 'react';
import { getAllQuestions, createQuestion, deleteQuestion } from '../api';

const AdminPage = ({ onBackToTest }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await getAllQuestions();
      setQuestions(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load questions');
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteQuestion(id);
        setQuestions(questions.filter(q => q._id !== id));
        alert('Question deleted successfully!');
      } catch (err) {
        alert('Failed to delete question');
      }
    }
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newQuestion.text.trim()) {
      alert('Please enter a question');
      return;
    }

    const hasCorrectAnswer = newQuestion.options.some(opt => opt.isCorrect);
    if (!hasCorrectAnswer) {
      alert('Please mark one option as correct');
      return;
    }

    const allOptionsFilled = newQuestion.options.every(opt => opt.text.trim());
    if (!allOptionsFilled) {
      alert('Please fill in all options');
      return;
    }

    try {
      const response = await createQuestion(newQuestion);
      setQuestions([response.data, ...questions]);
      setNewQuestion({
        text: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false }
        ]
      });
      setShowForm(false);
      alert('Question added successfully!');
    } catch (err) {
      console.error('Error adding question:', err);
      alert('Failed to add question. Check console for details.');
    }
  };

  const updateOption = (index, field, value) => {
    const updatedOptions = newQuestion.options.map((opt, i) => {
      if (i === index) {
        return { ...opt, [field]: value };
      }
      // If marking this as correct, unmark others
      if (field === 'isCorrect' && value === true) {
        return { ...opt, isCorrect: false };
      }
      return opt;
    });

    setNewQuestion({ ...newQuestion, options: updatedOptions });
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">👨‍💼 Admin Panel</h1>
              <p className="text-gray-600">Manage IELTS Questions ({questions.length} total)</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(!showForm)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  showForm 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {showForm ? '❌ Cancel' : '➕ Add Question'}
              </button>
              <button
                onClick={onBackToTest}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
              >
                🏠 Back to Home
              </button>
            </div>
          </div>
        </div>

        {/* Add Question Form */}
        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">➕ Add New Question</h2>
            <form onSubmit={handleSubmitQuestion}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Text *
                </label>
                <textarea
                  value={newQuestion.text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="Enter your IELTS question here..."
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Answer Options * (Select the correct answer)
                </label>
                <div className="space-y-3">
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <input
                        type="radio"
                        name="correct-answer"
                        checked={option.isCorrect}
                        onChange={(e) => updateOption(index, 'isCorrect', e.target.checked)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="font-medium text-gray-700 w-8">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => updateOption(index, 'text', e.target.value)}
                        className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        required
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  💡 Select the radio button next to the correct answer
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-colors"
                >
                  ✅ Add Question
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold transition-colors"
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={loadQuestions}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">📝 No Questions Yet</h3>
              <p className="text-gray-500 text-lg mb-4">
                Add some questions to get started with your IELTS mock test!
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                ➕ Add Your First Question
              </button>
            </div>
          ) : (
            questions.map((question, index) => (
              <div key={question._id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-4">
                    <span className="text-blue-600">Q{index + 1}.</span> {question.text}
                  </h3>
                  <button
                    onClick={() => handleDeleteQuestion(question._id)}
                    className="text-red-600 hover:text-red-800 px-3 py-1 rounded border border-red-300 hover:bg-red-50 font-medium transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={option._id}
                      className={`p-3 rounded border ${
                        option.isCorrect
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-gray-300 bg-gray-50'
                      }`}
                    >
                      <span className="font-medium">
                        {String.fromCharCode(65 + optIndex)}.
                      </span> {option.text}
                      {option.isCorrect && (
                        <span className="ml-2 text-green-600 font-bold">✓ Correct</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;