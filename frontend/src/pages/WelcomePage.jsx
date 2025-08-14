const WelcomePage = ({ onStartTest, onGoToAdmin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-12 rounded-2xl shadow-xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🎓 IELTS Mock Test
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Practice Your English Skills
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded"></div>
        </div>

        {/* Test Information */}
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-lg font-semibold text-blue-800 mb-4">Test Information:</h2>
          <ul className="space-y-2 text-blue-700">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <strong>Duration:</strong> 10 minutes
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <strong>Questions:</strong> Multiple choice format
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <strong>Scoring:</strong> Instant results with percentage
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <strong>Timer:</strong> Auto-submit when time expires
            </li>
          </ul>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-50 p-6 rounded-lg mb-8">
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-yellow-700">
            <li>Read each question carefully</li>
            <li>Select one answer per question</li>
            <li>You can change your answers before submitting</li>
            <li>Submit early or wait for auto-submission</li>
            <li>Review your results and try again if needed</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onStartTest}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            🚀 Start Test Now
          </button>
          
          <button
            onClick={onGoToAdmin}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors"
          >
            👨‍💼 Admin Panel
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Good luck with your practice! 🍀
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;