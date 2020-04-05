import React, { useContext } from "react";
import SettingsContext from "./SettingsContext";

const PlayButton = () => {
  const { play } = useContext(SettingsContext);
  return (
    <button
      onClick={() => {
        play();
      }}
    >
      play
    </button>
  );
};

export default PlayButton;
