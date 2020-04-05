import React, { useState } from "react";

import { UNIT } from "./settingsReducer";
const AmountSelector = ({ onChange }) => {
  const [selectValue, setSelectValue] = useState(UNIT.COUNT);
  return (
    <select
      value={selectValue}
      onChange={evt => {
        const { value } = evt.target;
        setSelectValue(value);
        onChange(value);
      }}
    >
      <option value={UNIT.COUNT}>Anzahl</option>
      <option value={UNIT.SECONDS}>Sekunden</option>
    </select>
  );
};

export default AmountSelector;
