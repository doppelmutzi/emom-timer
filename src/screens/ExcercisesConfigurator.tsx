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
import SettingsContext, { ActivityType, Activity } from "../SettingsContext";
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
  const {
    activitiesOneRound: activities,
    dirty,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  } = settings!;
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
        <Button
          onClick={() => {
            dispatch && dispatch({ type: "SET_DIRTY", dirty: true });
            addActivity({
              type: ActivityType.ExcerciseForReps,
              valid: false,
              durationInSec: 60,
            });
          }}
        >
          add exercise for reps
        </Button>
        <Button
          onClick={() => {
            dispatch && dispatch({ type: "SET_DIRTY", dirty: true });
            addActivity({
              type: ActivityType.ExcerciseForTime,
              valid: false,
              durationInSec: 30,
            });
          }}
        >
          add exercise with timecap
        </Button>
        <Button
          onClick={() => {
            addActivity({
              description: "rest",
              type: ActivityType.Rest,
              valid: true,
              durationInSec: 60,
            });
          }}
        >
          add rest
        </Button>
      </VerticalContainer>
      {activities.map((activity, i) => {
        return (
          <div key={i} className="exercise-set l-horizontal">
            <Label text={`activity ${i + 1}:`} level={4} />
            {activity.type === ActivityType.Rest ? (
              <UtteranceInput
                label="rest"
                value={activity.durationInSec.toString()}
                placeholder="in seconds"
                type="number"
                onChange={(restInSec) => {
                  const rest = parseInt(restInSec);
                  if (typeof rest === "number" && rest > 0) {
                    activity.durationInSec = rest;
                    activity.valid = true;
                  } else {
                    activity.valid = false;
                  }
                  checkInput();
                }}
              />
            ) : (
              <>
                <UtteranceInput
                  label="excercise"
                  value={activity.description || ""}
                  type="text"
                  placeholder={
                    activity.type === ActivityType.ExcerciseForTime
                      ? "10 burpees"
                      : "burpees"
                  }
                  onChange={(description) => {
                    if (description !== "") {
                      activity.description = description;
                      activity.valid = true;
                    } else {
                      activity.valid = false;
                    }
                    checkInput();
                  }}
                />
                <UtteranceInput
                  label="duration"
                  value={activity.durationInSec.toString()}
                  placeholder="in seconds"
                  type="number"
                  onChange={(durationInSec) => {
                    const duration = parseInt(durationInSec);
                    if (typeof duration === "number" && duration > 0) {
                      activity.durationInSec = duration;
                      activity.valid = true;
                    } else {
                      activity.valid = false;
                    }
                    checkInput();
                  }}
                />
                {activity.type === ActivityType.ExcerciseForTime && (
                  <UtteranceInput
                    label="time cap"
                    value={activity.durationInSec.toString()}
                    placeholder="in seconds"
                    type="number"
                    onChange={(timecapInSec) => {
                      const timecap = parseInt(timecapInSec);
                      if (typeof timecap === "number" && timecap > 0) {
                        activity.timecapInSec = timecap;
                        activity.valid = true;
                      } else {
                        activity.valid = false;
                      }
                      checkInput();
                    }}
                  />
                )}
              </>
            )}
          </div>
        );
      })}
      <HorizontalContainer>
        {/* 
        
        TODO nach step 2 verschieben
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
        </Button> */}
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
    // TODO
  }

  function isDisabled() {
    return activities.length === 0 || dirty;
  }

  function checkInput() {
    const invalid = activities.filter((activity) => activity.valid === false);
    if (invalid.length > 0) {
      dispatch && dispatch({ type: "SET_DIRTY", dirty: true });
    } else {
      dispatch && dispatch({ type: "SET_DIRTY", dirty: false });
    }
  }

  function addActivity(activity: Activity) {
    dispatch &&
      dispatch({
        type: "SET_ACTIVITIES",
        activities: [...activities, activity],
      });
  }
}

export default React.memo(ExcercisesConfigurator);
