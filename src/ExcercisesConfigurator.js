import React, { useContext } from "react";
import UtteranceInput from "./UtteranceInput";
import SettingsContext from "./SettingsContext";
import "./exercises.css";
import { UNIT } from "./settingsReducer";
import { HorizontalContainer } from "./Layout";
import TemplatesDropdown from "./TemplatesDropdown";
import { useHistory } from "react-router-dom";

export default function ExcercisesConfigurator() {
  const { dispatch, settings } = useContext(SettingsContext);
  const { timerType, emomTimeInSec, rounds, minutes, dirty } = settings;
  const history = useHistory();

  return (
    <div className="exercises-container">
      <TemplatesDropdown />
      <HorizontalContainer>
        <select
          value={timerType}
          onChange={evt => {
            const timerType = evt.target.value;
            dispatch({ type: "SET_TIMER_TYPE", timerType });
          }}
        >
          <option value="emom">EMOM</option>
          <option value="rounds">Rounds</option>
        </select>
        {timerType === "emom" ? (
          <UtteranceInput
            value={emomTimeInSec / 60}
            label="Overall workout time"
            placeholder="in minutes"
            type="number"
            onChange={timeInMinutes =>
              dispatch({
                type: "SET_EMOM_TIME",
                emomTimeInSec: timeInMinutes * 60
              })
            }
          />
        ) : (
          <UtteranceInput
            label="Number repetitions of minutes"
            type="number"
            onChange={rounds => dispatch({ type: "SET_ROUNDS", rounds })}
          />
        )}
      </HorizontalContainer>
      <HorizontalContainer>
        <button
          onClick={() => {
            dispatch({ type: "SET_DIRTY", dirty: true });
            addMinute({ label: "", unit: UNIT.COUNT, valid: false });
          }}
        >
          add 1 minute for reps
        </button>
        <button
          onClick={() => {
            dispatch({ type: "SET_DIRTY", dirty: true });
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
      {minutes.map((minute, i) => {
        return (
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
        );
      })}
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
            history.push("/workout");
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
    dispatch({ type: "SET_EMOM_TIME", emomTimeInSec: emom });
  }

  function isDisabled() {
    return (
      minutes.length === 0 ||
      (timerType === "emom" && emomTimeInSec <= 0) ||
      (timerType !== "emom" && rounds <= 0) ||
      dirty
    );
  }

  function checkInput() {
    const invalid = minutes.filter(minute => minute.valid === false);
    if (invalid.length > 0) dispatch({ type: "SET_DIRTY", dirty: true });
    else dispatch({ type: "SET_DIRTY", dirty: false });
  }

  function addMinute(minute) {
    dispatch({ type: "SET_MINUTES", minutes: [...minutes, minute] });
  }
}
