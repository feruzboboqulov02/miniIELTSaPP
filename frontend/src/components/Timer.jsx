import { useState, useEffect, useMemo } from 'react';

const Timer = ({ onTimeUp, duration = 600 }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }
    const t = setInterval(() => setTimeLeft(s => s - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft, onTimeUp]);

  const mmss = useMemo(() => {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }, [timeLeft]);

  const pct = (1 - timeLeft / duration) * 100;
  const danger = timeLeft <= 60;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-40 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full ${danger ? 'bg-red-600' : 'bg-slate-900'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`font-mono text-sm ${danger ? 'text-red-700' : 'text-slate-900'}`}>{mmss}</span>
    </div>
  );
};

export default Timer;
