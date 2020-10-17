import React from "react";

import ExcerciseConfigurator from "./ExcercisesConfigurator";
import VoicesDropdown from "./VoicesDropdown";
import { VerticalContainer } from "./Layout";
const EditView = () => {
  return (
    <VerticalContainer>
      <VoicesDropdown />
      <ExcerciseConfigurator />
    </VerticalContainer>
  );
};

export default React.memo(EditView);
