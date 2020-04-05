import React, { useContext, useState, useCallback } from "react";

import SettingsContext from "./SettingsContext";
import Timer from "./Timer";
import { UNIT } from "./settingsReducer";

const WorkoutView = () => {
  const { settings, play } = useContext(SettingsContext);
  const [playback, setPlayback] = useState();
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);

  // TODO useCallback https://reacttraining.com/blog/when-to-use-functions-in-hooks-dependency-array/

  return (
    <div>
      <Timer
        label="emom"
        countInSec={settings.emomTimeInSec}
        playback={playback}
        onComplete={() => {
          play("Workout complete");
        }}
      />
      {settings.minutes.map((minute, index) => {
        const nextMinuteAvailable = index + 1 <= settings.minutes.length - 1;
        const restInSec = minute.unit === UNIT.SECONDS ? 60 - minute.amount : 0;
        return (
          index === currentTimerIndex && (
            <div key={index}>
              {nextMinuteAvailable && (
                <label>Next: {settings.minutes[index + 1].label}</label>
              )}
              <Timer
                label={`min ${index + 1}: ${minute.label}`}
                countInSec={minute.unit === UNIT.SECONDS ? minute.amount : 60}
                restInSec={restInSec}
                playback={playback}
                onStart={() => {
                  console.log("onStart()", minute);
                  play(`Current workout ${minute.label}`);
                }}
                onComplete={() => {
                  console.log("onComplete()", index);
                  const nextMinuteAvailable =
                    index + 1 <= settings.minutes.length - 1;
                  nextMinuteAvailable &&
                    play(`Next up: ${settings.minutes[index + 1].label}`);
                  setCurrentTimerIndex(index + 1);
                }}
              />
            </div>
          )
        );
      })}
      <button
        onClick={() => {
          if (playback === "stop") {
            setPlayback("play");
          } else {
            setPlayback("stop");
          }
        }}
      >
        {!playback || playback === "stop" ? "starten" : "stop"}
      </button>
      <button
        onClick={() => {
          setPlayback("reset");
        }}
      >
        reset
      </button>
    </div>
  );
};

export default WorkoutView;
