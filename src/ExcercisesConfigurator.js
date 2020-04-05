import React, { useState, useContext } from "react";
import UtteranceInput from "./UtteranceInput";
import SettingsContext from "./SettingsContext";
import "./exercises.css";
import AmountSelector from "./AmountSelector";
import { UNIT } from "./settingsReducer";

export default function ExcercisesConfigurator() {
  const { dispatch } = useContext(SettingsContext);
  const [emomTimeInSec, setEmomTimeInSec] = useState(0);
  const [minutes, setMinutes] = useState([
    { label: "", amount: 0, unit: UNIT.SECONDS }
  ]);
  return (
    <div className="exercises-container">
      <UtteranceInput
        label="EMOM"
        type="number"
        onChange={timeInSec => setEmomTimeInSec(timeInSec)}
      />
      <button
        onClick={() => {
          addMinute({ label: "", amount: 1, unit: UNIT.COUNT });
        }}
      >
        add minute
      </button>
      {minutes.map((minute, i) => (
        <div key={i} className="exercise-set">
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
        </div>
      ))}
      <button
        onClick={() => {
          dispatch({ type: "SET_EMOM_TIME", emomTimeInSec });
          console.log("minutes", minutes);
          dispatch({ type: "SET_MINUTES", minutes });
        }}
      >
        Speichern
      </button>
    </div>
  );

  function addMinute(minute) {
    setMinutes([...minutes, minute]);
  }
}
