
import TestPage from './pages/TestPage';

const App = () => {
  const handleTestComplete = (result) => {
    console.log('Test completed:', result);
    alert(`Test completed! Score: ${result.percent}%`);
  };

  return (
    <div className="App">
      <TestPage onTestComplete={handleTestComplete} />
    </div>
  );
};

export default App;