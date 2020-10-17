import React, { useState, useEffect } from "react";
import "./input.css";

const UtteranceInput = ({ onChange, type, value, label, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log("useEffect UtteranceInput [value]");
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        type={type}
        value={inputValue}
        placeholder={placeholder}
        onChange={evt => {
          const { value: newValue } = evt.target;
          setInputValue(newValue);
          onChange(newValue);
        }}
      />
    </div>
  );
};

UtteranceInput.whyDidYouRender = true;

export default React.memo(UtteranceInput);
