import React, { useEffect, useRef, useState } from "react";

const Timer = ({
  countInSec,
  restInSec = 0,
  label,
  onStart = () => {},
  onNearComplete = () => {},
  onComplete = () => {},
  onRest = () => {},
  playback
}) => {
  const intervalRef = useRef(1000);
  const restRef = useRef(restInSec * intervalRef.current);
  const initialCountRef = useRef(countInSec * intervalRef.current);

  const [count, setCount] = useState(initialCountRef.current);

  useEffect(() => {
    initialCountRef.current = countInSec * intervalRef.current;
  }, [countInSec]);

  const onStartRef = useRef();

  useEffect(() => {
    // console.log("useEffect onStart");
    onStartRef.current = onStart;
  }, [onStart]);

  const onRestRef = useRef();

  useEffect(() => {
    // console.log("useEffect onRest");
    onRestRef.current = onRest;
  }, [onRest]);

  const onCompletetRef = useRef();

  useEffect(() => {
    // console.log("useEffect onComplete");
    onCompletetRef.current = onComplete;
  }, [onComplete]);

  const onNearCompletetRef = useRef();

  useEffect(() => {
    // console.log("useEffect onNearComplete");
    onNearCompletetRef.current = onNearComplete;
  }, [onNearComplete]);

  useEffect(() => {
    if (playback === "play") {
      if (count === initialCountRef.current && onStartRef.current) {
        onStartRef.current();
        onStartRef.current = null;
      }
      const id = setInterval(() => {
        setCount(c => c - intervalRef.current);
      }, intervalRef.current);
      if (restRef.current === 0 && count === 3 * intervalRef.current) {
        onNearCompletetRef.current();
      }
      if (count === 0) {
        if (restRef.current > 0) {
          onRestRef.current();
          setCount(restRef.current);
          restRef.current = 0;
        } else {
          onCompletetRef.current();
          clearInterval(id);
        }
      }
      return () => clearInterval(id);
    } else if (playback === "reset") {
      setCount(initialCountRef.current);
    }
  }, [playback, count]);

  return (
    <div>
      {label}: {count / intervalRef.current}
    </div>
  );
};

export default Timer;
