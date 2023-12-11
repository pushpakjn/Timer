import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; 
import { FaPlay, FaPause, FaUndo } from 'react-icons/fa'; 

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState(0);
  const [minutesInput, setMinutesInput] = useState(5);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timer;

    if (countdown > 0 && !isPaused) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown, isPaused]);
  useEffect(() => {
    setCountdown(minutesInput * 60);
    setIsPaused(true);
  }, [minutesInput]);
  const startCountdown = () => {
    if (countdown === 0) {
      setCountdown(minutesInput * 60);
      setIsPaused(false);
    }
    if(isPaused){
      setIsPaused(false);
    }
  };

  const pauseCountdown = () => {
    setIsPaused(true);
  };

  const resetCountdown = () => {
    setCountdown(0);
    setIsPaused(false);
  };

  const updateTimerDisplay = () => {
    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  };

  const padZero = number => (number < 10 ? '0' + number : number);

  return (
    <div className="countdown-timer-container">
      <h2>Countdown Timer</h2>
      <div className="input-container">
        <label>
          Set Countdown (minutes):
          <input
            type="number"
            value={minutesInput}
            onChange={e => setMinutesInput(e.target.value)}
          />
        </label>
      </div>
      <div className="timer-container">
        <div id="timer">{updateTimerDisplay()}</div>
        <div className="button-container">
          <button onClick={startCountdown}>
            <FaPlay /> Play
          </button>
          <button onClick={pauseCountdown}>
            <FaPause /> Pause
          </button>
          <button onClick={resetCountdown}>
            <FaUndo /> Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
