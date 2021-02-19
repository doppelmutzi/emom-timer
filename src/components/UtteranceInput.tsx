import { memo, useState, useEffect } from "react";
import "./input.css";

type UtteranceInputInterface = {
  onChange: (newValue: string) => void;
  type: string;
  value: string;
  label: string;
  placeholder: string;
};

const UtteranceInput = ({
  onChange,
  type,
  value,
  label,
  placeholder,
}: UtteranceInputInterface) => {
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
        onChange={(evt) => {
          const { value: newValue } = evt.target;
          setInputValue(newValue);
          onChange(newValue);
        }}
      />
    </div>
  );
};

UtteranceInput.whyDidYouRender = true;

export default memo(UtteranceInput);
