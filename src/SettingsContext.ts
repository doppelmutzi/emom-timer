import { createContext } from "react";

export enum ActivityType {
  ExcerciseForReps = 1,
  ExcerciseForTime = 2,
  Rest = 3,
}

// TODO custom validation möglich? timecap <= duration
export type Activity = {
  type: ActivityType;
  durationInSec: number;
  timecapInSec?: number; // durationInSec - timecapInSec = rest
  description?: string;
  valid: boolean; // ist das für Validierung?
};

export type State = {
  dirty: boolean;
  voiceIndex: number;
  currentVoice: string;
  overallTimeInSec: number;
  rounds: number;
  // overall activities = activitiesOneRound * rounds
  activitiesOneRound: Activity[];
};

export type ActionType =
  | { type: "RESET" }
  | { type: "SET_DIRTY"; dirty: boolean }
  | { type: "CHANGE_VOICE"; index: number }
  | { type: "SET_EMOM_TIME"; emomTimeInSec: number }
  | { type: "SET_ACTIVITIES"; activities: Activity[] }
  | { type: "SET_ROUNDS"; rounds: number }
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
