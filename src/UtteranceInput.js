import React, { useState } from "react";
import "./input.css";

const UtteranceInput = ({ onChange, type, label, placeholder }) => {
  const [value, setValue] = useState("");
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
