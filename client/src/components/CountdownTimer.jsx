import React, { useState, useEffect } from "react";
import alarm from "../assets/boxing-bell.mp3";

function CountdownTimer() {
  const [totalTime, setTotalTime] = useState(60); // Initial total time in seconds
  const [currentTime, setCurrentTime] = useState(totalTime); // Initial current time in seconds
  const [isPaused, setIsPaused] = useState(false); // Initial pause state
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false); // Initial Alarm state
  const [increment, setIncrement] = useState(15); // Initial increment value
  const audioRef = React.createRef();

  // Function to decrease total time by chosen increment
  const decreaseTotalTime = () => {
    if (currentTime > increment) {
      setTotalTime(totalTime - increment);
      setCurrentTime(currentTime - increment);
    } else if (currentTime > 0) {
      setTotalTime(0);
      setCurrentTime(0);
    }
  };

  // Function to increase total time by chosen increment
  const increaseTotalTime = () => {
    setTotalTime(totalTime + increment);
    setCurrentTime(currentTime + increment);
    setIsAlarmPlaying(false);
  };

  // Function to handle increment value change
  const handleIncrementChange = (event) => {
    setIncrement(parseInt(event.target.value));
  };

  // Function to pause the timer
  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  // Function to decrease current time by 1 second
  const decreaseCurrentTime = () => {
    setCurrentTime(currentTime - 1);
  };

  useEffect(() => {
    let intervalId;
    if (!isPaused && currentTime > 0) {
      intervalId = setTimeout(() => {
        decreaseCurrentTime();
      }, 1000);
    } else {
      clearTimeout(intervalId);
    }
    return () => clearTimeout(intervalId);
  }, [currentTime, isPaused]);

  // Check if the current time is 0, and play the alarm if it is
  useEffect(() => {
    if (currentTime === 0 && !isAlarmPlaying) {
      audioRef.current.play();
      setIsAlarmPlaying(true);
    }
  }, [currentTime, isAlarmPlaying]);

  // Calculate the percentage of current time compared to total time
  const percentage = (currentTime / totalTime) * 100;

  // Calculate the minutes and seconds of total time
  const totalMinutes = Math.floor(totalTime / 60);
  const totalSeconds = totalTime % 60;

  // Calculate the minutes and seconds of current time
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = currentTime % 60;

  return (
    <div>
      <div>
        <div>
          Total Time: {totalMinutes}:
          {totalSeconds < 10 ? `0${totalSeconds}` : totalSeconds}
        </div>
        <div>
          Current Time: {currentMinutes}:
          {currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds}
        </div>
        <div>
          <label>Increment:</label>
          <select onChange={handleIncrementChange} value={increment}>
            <option value={5}>5 seconds</option>
            <option value={15}>15 seconds</option>
            <option value={30}>30 seconds</option>
          </select>
        </div>
        <button
          onClick={decreaseTotalTime}
          disabled={currentTime === 0 || totalTime === 0}
        >
          -{increment}s
        </button>
        <button onClick={increaseTotalTime}>+{increment}s</button>
        <button onClick={handlePause} disabled={currentTime === 0}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
      <div>
        <div className="progress-bar" style={{ width: `${percentage}%` }} />
      </div>
      <audio ref={audioRef} src={alarm} />
    </div>
  );
}

export default CountdownTimer;
