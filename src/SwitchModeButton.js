import React, { useContext } from "react";
import SettingsContext from "./SettingsContext";

const SwitchModeButton = () => {
  const { settings, dispatch } = useContext(SettingsContext);

  return (
    <button
      onClick={() => {
        dispatch({ type: "SET_MODE", editMode: !settings.editMode });
      }}
    >
      {settings.editMode ? "Workout starten" : "Workout planen"}
    </button>
  );
};

export default SwitchModeButton;
