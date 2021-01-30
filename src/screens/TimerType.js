import React from "react";
import { useHistory } from "react-router-dom";

import Button from "../components/Button";
import Screen from "../Screen";

const TimerType = (): JSXElement => {
  const history = useHistory();
  return (
    <Screen>
      <Button
        onClick={() => {
          history.push("/edit");
        }}
      >
        EMOM
      </Button>
    </Screen>
  );
};

export default TimerType;
