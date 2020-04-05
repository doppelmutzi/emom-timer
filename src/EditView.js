import React from "react";

import VoicesDropdown from "./VoicesDropdown";
import PlayButton from "./PlayButton";
import ExcerciseConfigurator from "./ExcercisesConfigurator";

const EditView = () => {
  return (
    <div>
      <VoicesDropdown />
      <PlayButton />
      <ExcerciseConfigurator />
    </div>
  );
};

export default EditView;
