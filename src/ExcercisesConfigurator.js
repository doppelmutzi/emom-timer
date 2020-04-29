import React, { useState, useContext } from "react";
import UtteranceInput from "./UtteranceInput";
import SettingsContext from "./SettingsContext";
import "./exercises.css";
import AmountSelector from "./AmountSelector";
import { UNIT } from "./settingsReducer";
import { HorizontalContainer } from "./Layout";

export default function ExcercisesConfigurator() {
  const { dispatch } = useContext(SettingsContext);
  const [timerType, setTimerType] = useState("emom");
  const [emomTimeInSec, setEmomTimeInSec] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [minutes, setMinutes] = useState([
    { label: "", amount: 0, unit: UNIT.SECONDS }
  ]);
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
            addMinute({ label: "", amount: 1, unit: UNIT.COUNT });
          }}
        >
          add minute
        </button>
        <button
          onClick={() => {
            addMinute({ label: "1 minute rest", unit: UNIT.REST });
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
                label="Übung"
                value={minute.label}
                type="text"
                onChange={label => (minute.label = label)}
              />
              <UtteranceInput
                label="Menge"
                value={minute.amount}
                type="number"
                onChange={amount => (minute.amount = amount)}
              />
              <div>{minute.unit}</div>
              <AmountSelector
                onChange={value => {
                  console.log("value", value);
                  minute.unit = value;
                }}
              />
            </>
          )}
        </div>
      ))}
      <button
        onClick={() => {
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
        }}
      >
        Speichern
      </button>
    </div>
  );

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
