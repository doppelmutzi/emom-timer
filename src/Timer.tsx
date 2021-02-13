import React, { useEffect, useRef, useState } from "react";

export enum Playback {
  PLAY = 1,
  STOP = 2,
  RESET = 3,
}

type TimerInterface = {
  countInSec: number;
  restInSec?: number;
  label: string;
  onStart: () => void;
  onNearComplete: () => void;
  onComplete: () => void;
  onRest: () => void;
  playback: Playback;
};

const Timer = ({
  countInSec,
  restInSec = 0,
  label,
  onStart,
  onNearComplete,
  onComplete,
  onRest,
  playback,
}: TimerInterface): JSX.Element => {
  const intervalRef = useRef(1000);
  const restRef = useRef(restInSec * intervalRef.current);
  const initialCountRef = useRef(countInSec * intervalRef.current);
  const isRestRef = useRef(false);

  const [count, setCount] = useState(initialCountRef.current);

  useEffect(() => {
    if (playback === Playback.PLAY) {
      if (count === initialCountRef.current) {
        if (!isRestRef.current) onStart();
      }
      const id = setInterval(() => {
        setCount((c) => c - intervalRef.current);
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
    } else if (playback === Playback.RESET) {
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
