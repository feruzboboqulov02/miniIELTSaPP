const ResultPage = ({ result, onRestartTest }) => {
  const getScoreColor = (percent) => {
    if (percent >= 80) return 'text-green-600';
    if (percent >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (percent) => {
    if (percent >= 80) return { text: 'Excellent!', color: 'bg-green-100 text-green-800' };
    if (percent >= 60) return { text: 'Good Job!', color: 'bg-yellow-100 text-yellow-800' };
    if (percent >= 40) return { text: 'Keep Practicing!', color: 'bg-orange-100 text-orange-800' };
    return { text: 'Need More Practice', color: 'bg-red-100 text-red-800' };
  };

  const badge = getScoreBadge(result.percent);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Main Result Card */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Test Results</h1>
          
          {/* Score Display */}
          <div className="mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.percent)}`}>
              {result.percent}%
            </div>
            <div className="text-xl text-gray-600 mb-4">
              {result.correct} out of {result.total} correct
            </div>
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${badge.color}`}>
              {badge.text}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onRestartTest}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              🔄 Take Another Test
            </button>
            <button
              onClick={() => window.location.href = '/admin'}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
            >
              👨‍💼 Admin Panel
            </button>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Question Breakdown</h2>
          
          <div className="space-y-3">
            {result.breakdown.map((item, index) => (
              <div
                key={item.questionId}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  item.correct
                    ? 'border-green-200 bg-green-50'
                    : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="font-semibold mr-3">Q{index + 1}</span>
                  <span className={`inline-block w-3 h-3 rounded-full mr-3 ${
                    item.correct ? 'bg-green-500' : 'bg-red-500'
                  }`}></span>
                  <span className="text-gray-700">
                    {item.correct ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                
                <div className="text-sm text-gray-500">
                  {item.correct ? '✓' : '✗'}
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary Stats */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{result.correct}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{result.total - result.correct}</div>
                <div className="text-sm text-gray-600">Incorrect</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;