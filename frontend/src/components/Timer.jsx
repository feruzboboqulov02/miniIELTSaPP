import { useState, useEffect } from 'react';

const Timer = ({ onTimeUp, duration = 600, running = true }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp, running]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isWarning = timeLeft <= 60;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`text-2xl font-bold p-4 rounded-lg border-2 backdrop-blur-lg shadow-lg ${
          isWarning
            ? 'text-red-600 border-red-500 bg-red-200/40'
            : 'text-blue-600 border-blue-500 bg-blue-200/40'
        }`}
      >
        Time Left: {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default Timer;
