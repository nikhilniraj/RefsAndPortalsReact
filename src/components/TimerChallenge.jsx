import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  //const [timeExpired, setTimerExpired] = useState(false);
  //const [timerStarted, setTimerStarted] = useState(false);
  const isTimerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }
  function handleStart() {
    //setInterval() is used when we want to run timer after defined time(milliseconds) every time
    timer.current = setInterval(() => {
      setTimeRemaining((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);
    // timer.current = setTimeout(() => {
    //   setTimerExpired(true);
    //   dialog.current.open();
    // }, targetTime * 1000);

    // setTimerStarted(true);
  }

  function handleStop() {
    dialog.current.open();
    clearInterval(timer.current);
    //clearTimeout(timer.current);
  }

  function handleTimerReset() {
    setTimeRemaining(targetTime * 1000);
  }
  return (
    <>
      <ResultModal
        ref={dialog}
        remainingTime={timeRemaining}
        targetTime={targetTime}
        onReset={handleTimerReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={isTimerActive ? "active" : undefined}>
          {isTimerActive ? "Timer is running..." : "Timer is inactive..."}
        </p>
      </section>
    </>
  );
}
