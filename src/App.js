import React, { useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SettingsContext from "./SettingsContext";
import settingsReducer, { getInitialSettings } from "./settingsReducer";
import SwitchModeButton from "./SwitchModeButton";
import EditView from "./EditView";
import WorkoutView from "./WorkoutView";

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
          {settings.editMode ? <EditView /> : <WorkoutView />}
          <SwitchModeButton />
        </header>
      </div>
    </SettingsContext.Provider>
  );
}

export default App;
