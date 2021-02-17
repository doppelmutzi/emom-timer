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
    // TODO sparen da berchenbar aus rounds * activities (Einzelzeiten jeder activity)
    case "SET_EMOM_TIME":
      return {
        ...state,
        overallTimeInSec: action.emomTimeInSec,
      };
    case "SET_ACTIVITIES":
      return {
        ...state,
        activitiesOneRound: [...action.activities],
      };
    case "SET_ROUNDS":
      return {
        ...state,
        rounds: action.rounds,
      };
    case "LOAD_TEMPLATE":
      return {
        ...action.template,
      };
    default:
      return state;
  }
};

export function getInitialSettings(): State {
  return {
    dirty: true,
    voiceIndex: 0,
    currentVoice: "de",
    overallTimeInSec: 60,
    rounds: 1,
    activitiesOneRound: [],
  };
}
