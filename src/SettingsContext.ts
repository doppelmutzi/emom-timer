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

/* 
  https://stackoverflow.com/questions/63767199/typescript-eslint-no-unused-vars-false-positive-in-type-declarations

  https://stackoverflow.com/questions/55807329/why-eslint-throws-no-unused-vars-for-typescript-interface
  */
type PlayFunc = (text: string) => void;

type Context = {
  settings: State;
  voices: SpeechSynthesisVoice[];
  play: PlayFunc;
  dispatch: React.Dispatch<ActionType>;
};

// Partial helper to create initial context without correct object
export default createContext<Partial<Context>>({});
