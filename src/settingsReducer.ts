import { State, ActionType } from "./SettingsContext";

export default (state: State, action: ActionType): State => {
  switch (action.type) {
    case "RESET":
      return getInitialSettings();
    case "SET_DIRTY":
      return {
        ...state,
        dirty: action.dirty,
      };
    case "CHANGE_VOICE":
      return {
        ...state,
        voiceIndex: action.index,
      };
    case "SET_EMOM_TIME":
      return {
        ...state,
        emomTimeInSec: action.emomTimeInSec,
      };
    case "SET_MINUTES":
      return {
        ...state,
        minutes: [...action.minutes],
      };
    case "LOAD_TEMPLATE":
      return {
        ...action.template,
      };
    default:
      return state;
  }
};

export const UNIT = {
  COUNT: "count",
  SECONDS: "seconds",
  REST: "rest",
};

export function getInitialSettings(): State {
  return {
    dirty: true,
    voiceIndex: 0,
    timerType: "emom_total_time",
    currentVoice: "de",
    emomTimeInSec: 0,
    minutes: [],
  };
}
