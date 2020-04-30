import React from "react";

import VoicesDropdown from "./VoicesDropdown";
import ExcerciseConfigurator from "./ExcercisesConfigurator";
import { VerticalContainer } from "./Layout";
const EditView = () => {
  return (
    <VerticalContainer>
      <VoicesDropdown />
      <ExcerciseConfigurator />
    </VerticalContainer>
  );
};

export default EditView;
