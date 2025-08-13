import { useState, useEffect } from 'react';

const Timer = ({ onTimeUp, duration = 600 }) => { // 600 seconds = 10 minutes
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isWarning = timeLeft <= 60; // Last minute warning

  return (
    <div className={`text-2xl font-bold p-4 rounded-lg border-2 ${
      isWarning ? 'text-red-600 border-red-500 bg-red-50' : 'text-blue-600 border-blue-500 bg-blue-50'
    }`}>
      Time Left: {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;