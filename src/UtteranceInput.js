import React, { useState, useEffect } from "react";
import "./input.css";

// TODO controlled/uncontrolled warning beheben
const UtteranceInput = ({
  onChange,
  type,
  value: initialValue,
  label,
  placeholder
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={evt => {
          const { value: val } = evt.target;
          setValue(val);
          onChange(val);
        }}
      />
    </div>
  );
};

export default UtteranceInput;
