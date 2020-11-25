import React, { useState, useContext } from "react";
import { TextField } from "@material-ui/core";

import SettingsContext from "../SettingsContext";
import { VerticalContainer, HorizontalContainer } from "../Layout";
import PlayButton from "./PlayButton";
import { RadioGroup, RadioButton } from "./RadioButton";

const VoicesSelection = () => {
  const { settings, voices, dispatch } = useContext(SettingsContext);
  const [textToPlay, setTextToPlay] = useState("");
  return (
    <VerticalContainer>
      <HorizontalContainer>
        <TextField
          variant="filled"
          label="preview playback"
          placeholder=""
          onChange={(evt) => setTextToPlay(evt.target.value)}
          value={textToPlay}
        />
        <PlayButton textToPlay={textToPlay} />
      </HorizontalContainer>
      <RadioGroup>
        {voices.map((voice, i) => (
          <RadioButton
            key={i}
            label={`${voice.name} ${voice.lang}`}
            icon={getFlag(voice.lang)}
            onClick={() => dispatch({ type: "CHANGE_VOICE", index: i })}
            checked={settings.voiceIndex === i}
          />
        ))}
      </RadioGroup>
    </VerticalContainer>
  );
};

// http://www.lingoes.net/en/translator/langcode.htm
// https://unicode.org/emoji/charts/full-emoji-list.html
function getFlag(lang) {
  if (lang.startsWith("de")) {
    return "🇩🇪";
  } else if (lang.startsWith("it")) {
    return "🇮🇹";
  } else if (lang === "es-MX") {
    return "🇲🇽";
  } else if (lang === "es-AR") {
    return "🇦🇷";
  } else if (lang.startsWith("es")) {
    return "🇪🇸";
  } else if (lang.endsWith("BE")) {
    return "🇧🇪";
  } else if (lang.startsWith("fr")) {
    return "🇨🇵";
  } else if (lang.startsWith("cs")) {
    return "🇨🇿";
  } else if (lang === "ko-KR") {
    return "🇰🇷";
  } else if (lang === "ko-KP") {
    return "🇰🇵";
  } else if (lang.startsWith("id")) {
    return "🇮🇩";
  } else if (lang.startsWith("th")) {
    return "🇹🇭";
  } else if (lang === "ar-SA") {
    return "🇸🇦";
  } else if (lang.startsWith("he")) {
    return "🇮🇱";
  } else if (lang === "en-CA") {
    return "🇨🇦";
  } else if (lang === "en-US") {
    return "🇺🇸";
  } else if (lang === "en-AU") {
    return "🇦🇺";
  } else if (lang.startsWith("en")) {
    return "🇬🇧";
  } else if (lang === "pt-BR") {
    return "🇧🇷";
  } else if (lang.startsWith("pt")) {
    return "🇵🇹";
  } else if (lang.startsWith("pl")) {
    return "🇵🇱";
  } else if (lang.startsWith("ro")) {
    return "🇷🇴";
  } else if (lang.startsWith("el")) {
    return "🇬🇷";
  } else if (lang.startsWith("nl")) {
    return "🇳🇱";
  } else if (lang.startsWith("ru")) {
    return "🇷🇺";
  } else if (lang.startsWith("sk")) {
    return "🇷🇸";
  } else if (lang.startsWith("ja")) {
    return "🇯🇵";
  } else if (lang.startsWith("hi")) {
    return "🇮🇳";
  } else if (lang.startsWith("hu")) {
    return "🇭🇺";
  } else if (lang.startsWith("hr")) {
    return "🇭🇷";
  } else if (lang.startsWith("fi")) {
    return "🇫🇮";
  } else if (lang.endsWith("NO")) {
    return "🇳🇴";
  } else if (lang.startsWith("se") || lang.startsWith("sv")) {
    return "🇸🇪";
  } else if (lang.startsWith("tr")) {
    return "🇹🇷";
  } else if (lang.startsWith("da")) {
    return "🇩🇰";
  } else if (lang.startsWith("bg")) {
    return "🇧🇬";
  } else if (lang.startsWith("zh")) {
    return "🇨🇳";
  }
  return "🏳️‍🌈";
}

VoicesSelection.whyDidYouRender = true;

export default VoicesSelection;
