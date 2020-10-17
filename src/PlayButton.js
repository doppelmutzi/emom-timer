import React, { useContext } from "react";
import SettingsContext from "./SettingsContext";
import "./Button.css";

const PlayButton = ({ textToPlay }) => {
  const { play } = useContext(SettingsContext);
  return (
    <button
      className="preview-button"
      onClick={() => {
        play(textToPlay);
      }}
    >
      preview
    </button>
  );
};

export default React.memo(PlayButton);
