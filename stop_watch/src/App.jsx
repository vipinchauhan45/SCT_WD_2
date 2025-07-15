import { useState, useRef } from "react";
import { Play, Pause, RefreshCcw, Flag } from "lucide-react";

export default function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [splits, setSplits] = useState([]);
  const timerRef = useRef(null);

  const startStop = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setSplits([]);
    setIsRunning(false);
  };

  const split = () => {
    setSplits([...splits, time]);
  };

  const formatTime = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-6 text-indigo-600 tracking-wide">🕒 Stopwatch</h1>
        <div className="text-6xl font-mono mb-8 bg-gray-100 rounded-xl py-6 shadow-inner">
          {formatTime(time)}
        </div>

        <div className="flex justify-center flex-wrap gap-4 mb-6">
          <button
            onClick={startStop}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 ${
              isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            {isRunning ? "Stop" : "Start"}
          </button>

          <button
            onClick={split}
            disabled={!isRunning}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold transition-all duration-200 disabled:opacity-50"
          >
            <Flag size={20} /> Split
          </button>

          <button
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-800 text-white font-semibold transition-all duration-200"
          >
            <RefreshCcw size={20} /> Reset
          </button>
        </div>

        {splits.length > 0 && (
          <div className="text-left mt-6 max-h-48 overflow-auto border-t border-gray-200 pt-4">
            <h2 className="font-semibold mb-2 text-indigo-700">📍 Splits</h2>
            <ul className="space-y-1 text-sm font-mono text-gray-700">
              {splits.map((splitTime, index) => (
                <li
                  key={index}
                  className="bg-indigo-50 rounded-md px-3 py-1 shadow-sm"
                >
                  #{index + 1} — {formatTime(splitTime)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
