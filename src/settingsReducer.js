export default (state, action) => {
  switch (action.type) {
    case "SET_MODE":
      return {
        ...state,
        editMode: action.editMode
      };
    case "CHANGE_VOICE":
      return {
        ...state,
        voiceIndex: action.index
      };
    case "SET_EMOM_TIME":
      return {
        ...state,
        emomTimeInSec: action.emomTimeInSec
      };
    case "SET_MINUTES":
      return {
        ...state,
        minutes: [...action.minutes]
      };
    default:
      return state;
  }
};

export const UNIT = {
  COUNT: "count",
  SECONDS: "seconds",
  REST: "rest"
};

export const getInitialSettings = () => {
  return {
    editMode: false,
    voiceIndex: 10,
    emomTimeInSec: 120,
    minutes: [
      {
        label: "Burpees",
        amount: 10,
        unit: UNIT.SECONDS
      },
      {
        label: "Froggers",
        amount: 20,
        unit: UNIT.SECONDS
      }
    ]
  };
};
