import React, {
  useReducer,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import SettingsContext, { State } from "./SettingsContext";
import settingsReducer, { getInitialSettings } from "./settingsReducer";
import EditView from "./EditView";
import WorkoutView from "./WorkoutView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const synth = window.speechSynthesis;
  const utterance = useMemo(
    () => new SpeechSynthesisUtterance("Hello Basis Community"),
    []
  );

  const [settings, dispatch] = useReducer(
    settingsReducer,
    getInitialSettings()
  );

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if ("onvoiceschanged" in synth) {
      // called after first render
      synth.addEventListener("voiceschanged", () => {
        setVoices(synth.getVoices());
      });
    }
    setVoices(synth.getVoices());
  }, [synth]);

  /*
    muss in useCallback gewrapped werden, ansonsten werden alle Komponenten
    re-rendered, die Kontext nutzen (unabhängig davon, ob sie diese Funktion benötigen/verwenden)
  */
  const memoizedPlay = useCallback(
    (text) => {
      const { voiceIndex: index } = settings;
      utterance.voice = voices[index];
      utterance.text = text;
      synth.speak(utterance);
    },
    [settings, synth, utterance, voices]
  );

  /*
    dispatch ohne useCallback nutzbar:
    React guarantees that dispatch function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list.
    https://reactjs.org/docs/hooks-reference.html#usereducer
  */
  return (
    <SettingsContext.Provider
      value={{ settings, voices, play: memoizedPlay, dispatch }}
    >
      <Router>
        <Switch>
          <Route exact path="/">
            <EditView />
          </Route>
          <Route path="/workout">
            <WorkoutView />
          </Route>
        </Switch>
      </Router>
    </SettingsContext.Provider>
  );
}

export default App;
