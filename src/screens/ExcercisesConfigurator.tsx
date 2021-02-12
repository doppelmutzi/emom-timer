import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Dialog, Slide, IconButton } from "@material-ui/core";
import { Settings as SettingsIcon } from "@material-ui/icons";
import { TransitionProps } from "@material-ui/core/transitions";

import PreferencesView from "../views/Preferences";
import Button from "../components/Button";
import Label from "../components/Label";
import Screen from "../Screen";
import UtteranceInput from "../components/UtteranceInput";
import SettingsContext, { MinuteType, Minute } from "../SettingsContext";
import { HorizontalContainer, VerticalContainer } from "../Layout";
import TemplatesDropdown from "../views/TemplatesDropdown";

import "./exercises.css";

// A custom hook that builds on useLocation to parse the query string for you.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// https://material-ui.com/components/dialogs/#AlertDialogSlide.tsx
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="right" ref={ref} {...props} />;
});

function ExcercisesConfigurator(): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { dispatch, settings } = useContext(SettingsContext);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { emomTimeInSec, minutes, dirty } = settings!;
  const history = useHistory();
  const query = useQuery();
  const template = query.get("template");

  useEffect(() => {
    console.log("useEffect ExcercisesConfigurator [dispatch, template");
    if (template) {
      const templateStringified = decodeURI(template);
      console.log("template", templateStringified);
      try {
        const json = JSON.parse(templateStringified);
        dispatch &&
          dispatch &&
          dispatch &&
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
      <VerticalContainer>
        <Label text="Duration of 1 exercise" level={3} />
        <HorizontalContainer>
          <UtteranceInput
            onChange={() => {
              /* todo */
            }}
            value={Math.floor(emomTimeInSec / 60).toString()}
            label="minutes"
            placeholder="1"
            type="number"
          />
        </HorizontalContainer>
        <HorizontalContainer>
          <UtteranceInput
            onChange={() => {
              /* todo */
            }}
            value={(emomTimeInSec % 60).toString()}
            label="seconds"
            placeholder="0"
            type="number"
          />
        </HorizontalContainer>
      </VerticalContainer>
      <HorizontalContainer>
        <UtteranceInput
          value={(emomTimeInSec / 60).toString()}
          label="Overall workout time"
          placeholder="in minutes"
          type="number"
          onChange={(timeInMinutes) =>
            dispatch &&
            dispatch &&
            dispatch({
              type: "SET_EMOM_TIME",
              emomTimeInSec: parseInt(timeInMinutes) * 60,
            })
          }
        />
      </HorizontalContainer>
      <VerticalContainer>
        <Button
          onClick={() => {
            dispatch &&
              dispatch &&
              dispatch({ type: "SET_DIRTY", dirty: true });
            // TODO amount berechnen
            addMinute({
              label: "",
              unit: MinuteType.COUNT,
              valid: false,
              amount: 60,
            });
          }}
        >
          add exercise for reps
        </Button>
        <Button
          onClick={() => {
            dispatch &&
              dispatch &&
              dispatch({ type: "SET_DIRTY", dirty: true });
            addMinute({
              label: "",
              unit: MinuteType.SECONDS,
              valid: false,
              amount: 30,
            });
          }}
        >
          add exercise with timecap
        </Button>
        <Button
          onClick={() => {
            addMinute({
              label: "rest",
              unit: MinuteType.REST,
              valid: false,
              amount: 60,
            });
          }}
        >
          add rest
        </Button>
      </VerticalContainer>
      {minutes.map((minute, i) => {
        return (
          <div key={i} className="exercise-set l-horizontal">
            <Label text={`round ${i + 1}:`} level={3} />
            {minute.unit === MinuteType.REST ? (
              <UtteranceInput
                label={`rest (${i + 1})`}
                value={minute.amount.toString()}
                placeholder="in seconds"
                type="text"
                onChange={() => {
                  // TODO
                }}
              />
            ) : (
              <>
                <UtteranceInput
                  label="exercise description"
                  value={minute.label}
                  type="text"
                  placeholder={
                    minute.unit === MinuteType.SECONDS
                      ? "10 burpees"
                      : "burpees"
                  }
                  onChange={(label) => {
                    if (label !== "") {
                      minute.label = label;
                      minute.valid = true;
                      checkInput();
                    }
                  }}
                />
                {minute.unit === MinuteType.SECONDS && (
                  <UtteranceInput
                    label="work"
                    value={minute.amount.toString()}
                    placeholder="in seconds"
                    type="number"
                    onChange={(amount) => {
                      if (parseInt(amount) > 0) {
                        minute.amount = parseInt(amount);
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
            localStorage.setItem("emom_" + key, JSON.stringify(settings));
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
    dispatch &&
      dispatch({
        type: "SET_EMOM_TIME",
        emomTimeInSec,
      });
  }

  function isDisabled() {
    return minutes.length === 0 || emomTimeInSec <= 0 || dirty;
  }

  function checkInput() {
    const invalid = minutes.filter((minute) => minute.valid === false);
    if (invalid.length > 0)
      dispatch && dispatch({ type: "SET_DIRTY", dirty: true });
    else dispatch && dispatch({ type: "SET_DIRTY", dirty: false });
  }

  // TODO rename add round?!
  function addMinute(minute: Minute) {
    dispatch &&
      dispatch({ type: "SET_MINUTES", minutes: [...minutes, minute] });
  }
}

export default React.memo(ExcercisesConfigurator);
