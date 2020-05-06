import React, { useReducer, useState } from "react";
import SettingsContext from "./SettingsContext";
import settingsReducer, { getInitialSettings } from "./settingsReducer";
import EditView from "./EditView";
import WorkoutView from "./WorkoutView";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance("Hello Basis Community");

  const [settings, dispatch] = useReducer(
    settingsReducer,
    getInitialSettings()
  );

  const [voices, setVoices] = useState(() => {
    if ("onvoiceschanged" in synth) {
      // called after first render
      synth.addEventListener("voiceschanged", () => {
        setVoices(synth.getVoices());
      });
    }
    return synth.getVoices();
  });

  const play = text => {
    const { voiceIndex: index } = settings;
    utterance.voice = voices[index];
    utterance.text = text;
    synth.speak(utterance);
  };

  return (
    <SettingsContext.Provider value={{ settings, voices, play, dispatch }}>
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
