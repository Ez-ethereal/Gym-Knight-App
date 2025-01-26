import React from 'react'

export default function Timer() {
  const [seconds, setSeconds] = React.useState(130); 
  const [isRunning, setIsRunning] = React.useState(true);

  React.useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  function startTimer() {
    setIsRunning(true)
  }
  
  function stopTimer() {
    setIsRunning(false)
  }

  function calcMins(secs) {
    return Math.floor(secs / 60)
  }

  function calcSecs(secs) {
    return secs - (60 * calcMins(secs))
  }

  const mins = calcMins(seconds)
  const secs = calcSecs(seconds)
  return (
    <div className="flex flex-col items-center justify-center z-10 space-y-12">
        <h1 className="text-2xl font-medium">{mins !== 0 ? `${mins} minutes` : ""} {secs} seconds</h1>
        <div className="flex items-center justify-center space-x-2">
            {isRunning ? 
                <button 
                    onClick={stopTimer}
                    className="py-2 px-6 bg-sky-900 text-white text-lg font-semibold rounded-md hover:bg-sky-800 transition-colors"
                >
                    Pause
                </button> : 
                <button
                    onClick={startTimer}
                    className="py-2 px-6 bg-sky-900 text-white text-lg font-semibold rounded-md hover:bg-sky-800 transition-colors"
                >
                    Resume
                </button>
            }
        </div>
    </div>
  );
};
