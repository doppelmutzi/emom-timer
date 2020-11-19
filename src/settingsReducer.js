export default (state, action) => {
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
    case "SET_TIMER_TYPE":
      return {
        ...state,
        timerType: action.timerType,
      };
    case "SET_EMOM_TIME":
      return {
        ...state,
        emomTimeInSec: action.emomTimeInSec,
      };
    case "SET_ROUNDS":
      return {
        ...state,
        rounds: action.rounds,
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

export function getInitialSettings() {
  return {
    dirty: true,
    voiceIndex: 0,
    timerType: "emom",
    currentVoice: "de",
    emomTimeInSec: 0,
    rounds: 0,
    minutes: [],
  };
}
