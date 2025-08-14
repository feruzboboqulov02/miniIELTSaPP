import { useState, useEffect } from 'react';
import WelcomePage from './pages/WelcomePage';
import TestPage from './pages/TestPage';
import ResultPage from './pages/ResultPage';
import AdminPage from './pages/AdminPage';

const App = () => {
  const [currentView, setCurrentView] = useState('welcome'); // 'welcome', 'test', 'result', 'admin'
  const [testResult, setTestResult] = useState(null);

  // Check URL for admin access on page load
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setCurrentView('admin');
    }
  }, []);

  const handleStartTest = () => {
    setCurrentView('test');
  };

  const handleTestComplete = (result) => {
    setTestResult(result);
    setCurrentView('result');
  };

  const handleRestartTest = () => {
    setTestResult(null);
    setCurrentView('welcome'); // Go back to welcome page
  };

  const goToAdmin = () => {
    setCurrentView('admin');
  };

  const backToWelcome = () => {
    setCurrentView('welcome');
  };

  return (
    <div className="App">
      {currentView === 'welcome' && (
        <WelcomePage 
          onStartTest={handleStartTest} 
          onGoToAdmin={goToAdmin} 
        />
      )}

      {currentView === 'test' && (
        <TestPage onTestComplete={handleTestComplete} />
      )}
      
      {currentView === 'result' && testResult && (
        <ResultPage 
          result={testResult} 
          onRestartTest={handleRestartTest}
        />
      )}
      
      {currentView === 'admin' && (
        <AdminPage onBackToTest={backToWelcome} />
      )}
    </div>
  );
};

export default App;