import React, { useContext, useState, useEffect } from "react";
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
  const [progressPercentage, setProgressPercentage] = useState(50);
  const colorIndicator = useColorIndication(progressPercentage);
  function valuetext(value) {
    return `${value}°C`;
  }
  function setProgressValue(event, value) {
    setProgressPercentage(value);
  }

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

const WorkoutView = () => {
  const { settings, play } = useContext(SettingsContext);
  const [playback, setPlayback] = useState();
  const [overallMinutes, setOverallMinutes] = useState([]);
  const [currentTimerIndex, setCurrentTimerIndex] = useState(0);
  const { dispatch } = useContext(SettingsContext);
  const history = useHistory();

  useEffect(() => {
    const combinedMinutes = getOverallMinutes(
      settings.minutes,
      settings.emomTimeInSec
    );
    setOverallMinutes(combinedMinutes);
  }, [settings.minutes, settings.emomTimeInSec]);

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
        onComplete={() => {
          play("Workout complete. Have a nice day.");
        }}
        play={play}
      />

      {overallMinutes.map((minute, index) => {
        const nextMinuteAvailable = index + 1 <= settings.minutes.length - 1;
        const labelNextMinute =
          nextMinuteAvailable && settings.minutes[index + 1].label;
        const restInSec = minute.unit === UNIT.SECONDS ? 60 - minute.amount : 0;

        // TODO React.memo für Timer ?

        return (
          index === currentTimerIndex && (
            <div key={index}>
              {nextMinuteAvailable && (
                <label>Next: {settings.minutes[index + 1].label}</label>
              )}
              <Timer
                label={`min ${index + 1}: ${minute.label}`}
                onStart={() => play(`Start ${minute.label}`)}
                onNearComplete={() => {
                  nextMinuteAvailable && play(`Next up ${labelNextMinute}`);
                }}
                onComplete={() => {
                  index < settings.minutes.length - 1 &&
                    setCurrentTimerIndex(i => i + 1);
                }}
                countInSec={minute.unit === UNIT.SECONDS ? minute.amount : 60}
                restInSec={restInSec}
                onRest={() => {
                  restInSec > 0 && play("rest");
                }}
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

function getOverallMinutes(minutes, emomTimeInSec) {
  const numberRounds =
    Math.floor(parseInt(emomTimeInSec) / 60) / minutes.length;
  let overallMinutes = [];
  for (let i = 1; i <= numberRounds; i++) {
    overallMinutes = [...overallMinutes, ...minutes];
  }
  return overallMinutes;
}

export default WorkoutView;
