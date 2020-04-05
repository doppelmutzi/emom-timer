import React, { useContext } from "react";
import SettingsContext from "./SettingsContext";
const VoicesDropdown = () => {
  const { settings, voices, dispatch } = useContext(SettingsContext);
  return (
    <div>
      <label>Sprache</label>
      <select
        value={settings.voiceIndex}
        onChange={evt => {
          const index = evt.target.value;
          dispatch({ type: "CHANGE_VOICE", index });
        }}
      >
        {voices.map((voice, i) => (
          <option key={i} value={i}>
            {voice.name} {voice.lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default VoicesDropdown;
