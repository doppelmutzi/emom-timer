import React, { useContext, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";

import SettingsContext from "./SettingsContext";
import Timer from "./Timer";
import { UNIT } from "./settingsReducer";
import ProgressArc from "./components/ProgressArc";

function useColorIndication(progressPercentage) {
  const [colorIndicator, setColorIndicator] = useState("red");
  useEffect(() => {
    progressPercentage > 50
      ? setColorIndicator("green")
      : setColorIndicator("red");
  }, [progressPercentage]);
  return colorIndicator;
}

function ProgressCircleWrapper() {
  const svgWidth = 150;
  const arcWidth = 12;
  const [progressPercentage /*, setProgressPercentage */] = useState(50);
  const colorIndicator = useColorIndication(progressPercentage);

  // function valuetext(value) {
  //   return `${value}°C`;
  // }
  // function setProgressValue(event, value) {
  //   setProgressPercentage(value);
  // }

  return (
    <Box padding="3rem" justifyContent="center">
      <ProgressArc
        svgWidth={svgWidth}
        arcWidth={arcWidth}
        progressPercentage={progressPercentage}
        colorIndicator={colorIndicator}
      />
    </Box>
  );
}

const onStartDefault = () => {};
const onNearCompleteDefault = onStartDefault;
const onRestDefault = onStartDefault;

const WorkoutView = () => {
  const { settings, play, dispatch } = useContext(SettingsContext);
  const [playback, setPlayback] = useState();
  const [overallMinutes, setOverallMinutes] = useState([]);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const history = useHistory();

  useEffect(() => {
    console.log("useEffect WorkoutView");
    function getOverallMinutes(minutes, emomTimeInSec) {
      const numberRounds =
        Math.floor(parseInt(emomTimeInSec) / 60) / minutes.length;
      let overallMinutes = [];
      for (let i = 1; i <= numberRounds; i++) {
        overallMinutes = [...overallMinutes, ...minutes];
      }
      return overallMinutes;
    }

    if (settings.minutes > 0 || settings.emomTimeInSec > 0) {
      const combinedMinutes = getOverallMinutes(
        settings.minutes,
        settings.emomTimeInSec
      );
      setOverallMinutes(combinedMinutes);
    }
  }, [settings.minutes, settings.emomTimeInSec, settings]);

  const memoizedOnOverallComplete = useCallback(() => {
    play("Workout complete. Have a nice day.");
  }, [play]);

  const memoizedOnStart = useCallback(
    minute => {
      play(`Start ${minute.label}`);
    },
    [play]
  );

  const memoizedOnNearComplete = useCallback(
    (nextMinuteAvailable, labelNextMinute) => {
      nextMinuteAvailable && play(`Next up ${labelNextMinute}`);
    },
    [play]
  );

  const memoizedOnComplete = useCallback(
    index => {
      index < settings.minutes.length - 1 && setCurrentTimerIndex(i => i + 1);
    },
    [settings.minutes]
  );

  const memoizedOnRest = useCallback(
    restInSec => {
      restInSec > 0 && play("rest");
    },
    [play]
  );

  // https://stackoverflow.com/questions/55045566/react-hooks-usecallback-causes-child-to-re-render/55047178#55047178
  // https://stackoverflow.com/questions/54932674/trouble-with-simple-example-of-react-hooks-usecallback
  // https://codesandbox.io/s/l4oqzp5z1q?fontsize=14&file=/src/index.js
  return (
    <div>
      <ProgressCircleWrapper />
      <Timer
        label="emom"
        countInSec={settings.emomTimeInSec}
        playback={playback}
        onStart={onStartDefault}
        onNearComplete={onNearCompleteDefault}
        onComplete={memoizedOnOverallComplete}
        onRest={onRestDefault}
        play={play}
      />

      {overallMinutes.map((minute, index) => {
        const nextMinuteAvailable = index + 1 <= settings.minutes.length - 1;
        const labelNextMinute =
          nextMinuteAvailable && settings.minutes[index + 1].label;
        const restInSec = minute.unit === UNIT.SECONDS ? 60 - minute.amount : 0;

        return (
          index === currentTimerIndex && (
            <div key={index}>
              {nextMinuteAvailable && (
                <label>Next: {settings.minutes[index + 1].label}</label>
              )}
              <Timer
                label={`min ${index + 1}: ${minute.label}`}
                onStart={() => memoizedOnStart(minute)}
                onNearComplete={() =>
                  memoizedOnNearComplete(nextMinuteAvailable, labelNextMinute)
                }
                onComplete={() => memoizedOnComplete(index)}
                countInSec={minute.unit === UNIT.SECONDS ? minute.amount : 60}
                restInSec={restInSec}
                onRest={() => memoizedOnRest(restInSec)}
                playback={playback}
              />
            </div>
          )
        );
      })}
      <div>
        <button
          onClick={() => {
            setPlayback("play");
          }}
        >
          start
        </button>
        <button
          onClick={() => {
            setPlayback("stop");
          }}
        >
          stop
        </button>
        <button
          onClick={() => {
            setCurrentTimerIndex(0);
            setPlayback("reset");
          }}
        >
          reset
        </button>
      </div>
      <button
        onClick={() => {
          dispatch({ type: "RESET" });
          history.push("/");
        }}
      >
        Create new timer
      </button>
    </div>
  );
};

WorkoutView.whyDidYouRender = true;

export default React.memo(WorkoutView);
