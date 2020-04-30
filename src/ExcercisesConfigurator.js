import React, { useState, useContext } from "react";
import UtteranceInput from "./UtteranceInput";
import SettingsContext from "./SettingsContext";
import "./exercises.css";
import AmountSelector from "./AmountSelector";
import { UNIT } from "./settingsReducer";
import { HorizontalContainer } from "./Layout";

export default function ExcercisesConfigurator() {
  const { dispatch, settings } = useContext(SettingsContext);
  const [timerType, setTimerType] = useState("emom");
  const [emomTimeInSec, setEmomTimeInSec] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [minutes, setMinutes] = useState([]);
  const [allValid, setAllValid] = useState(true);
  return (
    <div className="exercises-container">
      <HorizontalContainer>
        <select
          value={timerType}
          onChange={evt => {
            const type = evt.target.value;
            setTimerType(type);
          }}
        >
          <option value="emom">EMOM</option>
          <option value="rounds">Rounds</option>
        </select>
        {timerType === "emom" ? (
          <UtteranceInput
            label="Overall workout time"
            placeholder="in minutes"
            type="number"
            onChange={timeInMinutes => setEmomTimeInSec(timeInMinutes * 60)}
          />
        ) : (
          <UtteranceInput
            label="Number repetitions of minutes"
            type="number"
            onChange={rounds => setRounds(rounds)}
          />
        )}
      </HorizontalContainer>
      <HorizontalContainer>
        <button
          onClick={() => {
            setAllValid(false);
            addMinute({ label: "", unit: UNIT.COUNT, valid: false });
          }}
        >
          add 1 minute for reps
        </button>
        <button
          onClick={() => {
            setAllValid(false);
            addMinute({
              label: "",
              amount: 30,
              unit: UNIT.SECONDS,
              valid: false
            });
          }}
        >
          add 1 minute for time
        </button>
        <button
          onClick={() => {
            addMinute({ label: "1 minute rest", unit: UNIT.REST, valid: true });
          }}
        >
          add 1 min rest
        </button>
      </HorizontalContainer>
      {minutes.map((minute, i) => (
        <div key={i} className="exercise-set l-horizontal">
          {minute.unit === UNIT.REST ? (
            <>
              <span>Minute {i + 1}</span>
              <div>1 minute rest</div>
            </>
          ) : (
            <>
              <span>Minute {i + 1}</span>
              <UtteranceInput
                label="Exercises"
                value={minute.label}
                type="text"
                onChange={label => {
                  if (label !== "") {
                    minute.label = label;
                    minute.valid = true;
                    checkInput();
                  }
                }}
              />
              {minute.unit === UNIT.SECONDS && (
                <UtteranceInput
                  label="Work"
                  value={minute.amount}
                  placeholder="number seconds"
                  type="number"
                  onChange={amount => {
                    if (amount > 0) {
                      minute.amount = amount;
                      minute.valid = true;
                      checkInput();
                    }
                  }}
                />
              )}
            </>
          )}
        </div>
      ))}
      <HorizontalContainer>
        <button
          disabled={isDisabled()}
          onClick={() => {
            updateState();
            const key = prompt("What's the name of the template?");
            localStorage.setItem(key, JSON.stringify(settings));
          }}
        >
          Save timer
        </button>
        <button
          disabled={isDisabled()}
          onClick={() => {
            updateState();
            dispatch({ type: "SET_MODE", editMode: false });
          }}
        >
          Go to workout
        </button>
      </HorizontalContainer>
    </div>
  );

  function updateState() {
    const emom =
      timerType === "emom"
        ? parseInt(emomTimeInSec)
        : parseInt(rounds) * minutes.length * 60;
    const overallMinutes = getOverallMinutes(minutes, emom);
    dispatch({ type: "SET_EMOM_TIME", emomTimeInSec: emom });
    dispatch({
      type: "SET_MINUTES",
      minutes: overallMinutes
    });
  }

  function isDisabled() {
    return (
      minutes.length === 0 ||
      (timerType === "emom" && emomTimeInSec <= 0) ||
      (timerType !== "emom" && rounds <= 0) ||
      !allValid
    );
  }

  function checkInput() {
    const invalid = minutes.filter(minute => minute.valid === false);
    if (invalid.length > 0) setAllValid(false);
    else setAllValid(true);
  }

  function getOverallMinutes(minutes, emomTimeInSec) {
    const numberRounds =
      Math.floor(parseInt(emomTimeInSec) / 60) / minutes.length;
    let overallMinutes = [];
    for (let i = 1; i <= numberRounds; i++) {
      overallMinutes = [...overallMinutes, ...minutes];
    }
    return overallMinutes;
  }

  function addMinute(minute) {
    setMinutes([...minutes, minute]);
  }
}
