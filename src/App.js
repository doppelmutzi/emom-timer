import React, { useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
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
    // called after first render
    synth.addEventListener("voiceschanged", () => {
      setVoices(synth.getVoices());
    });
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
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
        </header>
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
