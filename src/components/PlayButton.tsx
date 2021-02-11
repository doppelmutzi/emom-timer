import React, { useContext } from "react";
import { IconButton } from "@material-ui/core";
import { PlayCircleOutline as PlayIcon } from "@material-ui/icons";

import SettingsContext from "../SettingsContext";

type PlayButtonInterface = {
  textToPlay: string;
};

const PlayButton = ({ textToPlay }: PlayButtonInterface): JSX.Element => {
  const { play } = useContext(SettingsContext);
  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        onClick={() => {
          play && play(textToPlay);
        }}
        aria-label="open"
      >
        <PlayIcon />
      </IconButton>
    </div>
  );
};

export default React.memo(PlayButton);
