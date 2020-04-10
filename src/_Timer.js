import React, { useState, useEffect, useContext, useRef } from "react";

import SettingsContext from "./SettingsContext";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const Timer = ({
  countInSec,
  restInSec = 0,
  label = "",
  playback,
  onStart,
  onComplete
}) => {
  const { play } = useContext(SettingsContext);
  const countdownRef = useRef(countInSec * 1000);
  const [countdown, setCountdown] = useState(() => countInSec * 1000);
  const [isActive, setIsActive] = useState(false);
  const [rest, setRest] = useState(() =>
    restInSec && restInSec > 0 ? true : false
  );
  const [workoutLabel, setWorkoutLabel] = useState(label);

  const prevCountdown = usePrevious(countdown);

  // TODO play mit useRef

  useEffect(() => {
    console.log("useEffect [playback]");
    function reset() {
      setCountdown(countdownRef.current);
      setIsActive(false);
    }

    function togglePlayPause() {
      setIsActive(isActive => !isActive);
    }

    if (prevCountdown === countdownRef.current) {
      onStart && onStart();
    }
    if (playback === "play") {
      togglePlayPause();
    } else if (playback === "stop") {
      togglePlayPause();
    } else {
      reset();
    }
  }, [playback /*prevCountdown onStart*/]);

  useEffect(() => {
    console.log("useEffect2");
    let timeout = null;

    if (isActive) {
      timeout = setTimeout(() => {
        setCountdown(current => current - 1000);
      }, 1000);
    }
    if (countdown === 0) {
      if (rest) {
        setCountdown(countdownRef.current);
        setRest(false);
        setWorkoutLabel("rest");
        play("rest");
      } else {
        clearTimeout(timeout);
        onComplete && onComplete();
      }
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [countdown, isActive /*rest, onComplete, play*/]);

  return <div>{`${workoutLabel} ${countdown / 1000} Sekunden`}</div>;
};

// https://github.com/facebook/react/issues/14010

export default Timer;
