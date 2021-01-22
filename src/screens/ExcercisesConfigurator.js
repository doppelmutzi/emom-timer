import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Dialog, Slide, IconButton } from "@material-ui/core";
import { Settings as SettingsIcon } from "@material-ui/icons";

import PreferencesView from "../views/Preferences";
import Button from "../components/Button";
import Screen from "../Screen";
import UtteranceInput from "../components/UtteranceInput";
import SettingsContext from "../SettingsContext";
import "./exercises.css";
import { UNIT } from "../settingsReducer";
import { HorizontalContainer, VerticalContainer } from "../Layout";
import TemplatesDropdown from "../views/TemplatesDropdown";

// A custom hook that builds on useLocation to parse the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function ExcercisesConfigurator() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { dispatch, settings } = useContext(SettingsContext);
  const { emomTimeInSec, minutes, dirty } = settings;
  const history = useHistory();
  let query = useQuery();
  const template = query.get("template");

  useEffect(() => {
    console.log("useEffect ExcercisesConfigurator [dispatch, template");
    if (template) {
      const templateStringified = decodeURI(template);
      console.log("template", templateStringified);
      try {
        const json = JSON.parse(templateStringified);
        dispatch({
          type: "LOAD_TEMPLATE",
          template: json,
        });
      } catch (error) {
        // illegal template
      }
    }
  }, [dispatch, template]);

  return (
    <Screen className="exercises-container">
      <HorizontalContainer>
        <div style={{ flex: 1, textAlign: "right" }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClickOpen}
            aria-label="open"
          >
            <SettingsIcon />
          </IconButton>
        </div>
      </HorizontalContainer>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <PreferencesView handleClose={handleClose} />
      </Dialog>
      <TemplatesDropdown />
      <HorizontalContainer>
        <UtteranceInput
          value={emomTimeInSec / 60}
          label="Overall workout time"
          placeholder="in minutes"
          type="number"
          onChange={(timeInMinutes) =>
            dispatch({
              type: "SET_EMOM_TIME",
              emomTimeInSec: timeInMinutes * 60,
            })
          }
        />
      </HorizontalContainer>
      <VerticalContainer>
        <Button
          onClick={() => {
            dispatch({ type: "SET_DIRTY", dirty: true });
            addMinute({ label: "", unit: UNIT.COUNT, valid: false });
          }}
        >
          add 1 minute for reps
        </Button>
        <Button
          onClick={() => {
            dispatch({ type: "SET_DIRTY", dirty: true });
            addMinute({
              label: "",
              amount: 30,
              unit: UNIT.SECONDS,
              valid: false,
            });
          }}
        >
          add 1 minute for time
        </Button>
        <Button
          onClick={() => {
            addMinute({ label: "1 minute rest", unit: UNIT.REST, valid: true });
          }}
        >
          add 1 min rest
        </Button>
      </VerticalContainer>
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
                  onChange={(label) => {
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
                    onChange={(amount) => {
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
        <Button
          color="secondary"
          disabled={isDisabled()}
          onClick={() => {
            updateState();
            const key = prompt("What's the name of the template?");
            localStorage.setItem(key, JSON.stringify(settings));
          }}
        >
          Save timer
        </Button>
        <Button
          color="secondary"
          onClick={() => {
            const encodedSettings = encodeURI(JSON.stringify(settings));
            const url = `${window.location.href}?template=${encodedSettings}`;
            prompt("Copy to clipboard: Ctrl+C, Enter", url);
          }}
        >
          share
        </Button>
        <Button
          disabled={isDisabled()}
          onClick={() => {
            updateState();
            history.push("/workout");
          }}
        >
          Go to workout
        </Button>
      </HorizontalContainer>
    </Screen>
  );

  function updateState() {
    dispatch({ type: "SET_EMOM_TIME", emomTimeInSec: parseInt(emomTimeInSec) });
  }

  function isDisabled() {
    return minutes.length === 0 || emomTimeInSec <= 0 || dirty;
  }

  function checkInput() {
    const invalid = minutes.filter((minute) => minute.valid === false);
    if (invalid.length > 0) dispatch({ type: "SET_DIRTY", dirty: true });
    else dispatch({ type: "SET_DIRTY", dirty: false });
  }

  function addMinute(minute) {
    dispatch({ type: "SET_MINUTES", minutes: [...minutes, minute] });
  }
}

export default React.memo(ExcercisesConfigurator);
