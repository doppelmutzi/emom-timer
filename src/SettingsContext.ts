import { createContext } from "react";

// TODO in round umbenennen
export enum MinuteType {
  COUNT = 1,
  SECONDS = 2,
  REST = 3,
}

export type Minute = {
  unit: MinuteType;
  amount: number;
  label: string;
  valid: boolean;
};

export type State = {
  dirty: boolean;
  voiceIndex: number;
  currentVoice: string;
  emomTimeInSec: number;
  minutes: Minute[];
};

export type ActionType =
  | { type: "RESET" }
  | { type: "SET_DIRTY"; dirty: boolean }
  | { type: "CHANGE_VOICE"; index: number }
  | { type: "SET_EMOM_TIME"; emomTimeInSec: number }
  | { type: "SET_MINUTES"; minutes: Minute[] }
  | { type: "LOAD_TEMPLATE"; template: State };

/* 
  https://stackoverflow.com/questions/63767199/typescript-eslint-no-unused-vars-false-positive-in-type-declarations

  https://stackoverflow.com/questions/55807329/why-eslint-throws-no-unused-vars-for-typescript-interface
  */
type PlayFunc = (text: string) => void;

export type Context = {
  settings: State;
  voices: SpeechSynthesisVoice[];
  play: PlayFunc;
  dispatch: React.Dispatch<ActionType>;
};

// Partial helper to create initial context without correct object
export default createContext<Partial<Context>>({});
