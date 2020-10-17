import React, { useEffect, useRef, useState } from "react";

const Timer = ({
  countInSec,
  restInSec = 0,
  label,
  onStart,
  onNearComplete,
  onComplete,
  onRest,
  playback
}) => {
  const intervalRef = useRef(1000);
  const restRef = useRef(restInSec * intervalRef.current);
  const initialCountRef = useRef(countInSec * intervalRef.current);
  const isRestRef = useRef(false);

  const [count, setCount] = useState(initialCountRef.current);

  useEffect(() => {
    if (playback === "play") {
      if (count === initialCountRef.current) {
        if (!isRestRef.current) onStart();
      }
      const id = setInterval(() => {
        setCount(c => c - intervalRef.current);
      }, intervalRef.current);
      if (restRef.current === 0 && count === 3 * intervalRef.current) {
        onNearComplete();
      }
      if (count === 0) {
        if (restRef.current > 0) {
          onRest();
          setCount(restRef.current);
          isRestRef.current = true;
          restRef.current = 0;
        } else {
          onComplete();
          clearInterval(id);
        }
      }
      return () => clearInterval(id);
    } else if (playback === "reset") {
      setCount(initialCountRef.current);
    }
  }, [playback, count, onStart, onNearComplete, onRest, onComplete]);

  return (
    <div>
      {label}: {count / intervalRef.current}
    </div>
  );
};

Timer.whyDidYouRender = true;

export default Timer;
