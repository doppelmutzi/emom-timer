import { createContext } from "react";

export type State = {
  dirty: boolean;
  voiceIndex: number;
  timerType: string;
  currentVoice: string;
  emomTimeInSec: number;
  rounds: number;
  minutes: number[];
};

export type ActionType =
  | { type: "RESET" }
  | { type: "SET_DIRTY"; dirty: boolean }
  | { type: "CHANGE_VOICE"; index: number }
  | { type: "SET_TIMER_TYPE"; timerType: string }
  | { type: "SET_EMOM_TIME"; emomTimeInSec: number }
  | { type: "SET_ROUNDS"; rounds: number }
  | { type: "SET_MINUTES"; minutes: number[] }
  | { type: "LOAD_TEMPLATE"; template: State };

type Context = {
  settings: State;
  voices: SpeechSynthesisVoice[];
  play: (text: string) => void;
  dispatch: React.Dispatch<ActionType>;
};

// Partial helper to create initial context without correct object
export default createContext<Partial<Context>>({});
