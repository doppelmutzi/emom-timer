import React from "react";

import "./RadioButton.css";

type RadioButtonInterface = {
  label: string;
  icon: string;
  onClick: () => void;
  checked?: boolean;
};

export const RadioButton = React.memo(
  ({
    label,
    icon,
    checked = false,
    onClick,
  }: RadioButtonInterface): JSX.Element => {
    return (
      <div className="radio-button" onClick={onClick}>
        <label>
          <span>{icon}</span>
          <span>{label}</span>
        </label>
        <div>
          <span className={`circle ${checked && "checked"}`}>
            {checked && <span></span>}
          </span>
        </div>
      </div>
    );
  }
);

type RadioGroupInterface = {
  children: React.ReactNode;
};

export const RadioGroup = React.memo(
  ({ children }: RadioGroupInterface): JSX.Element => (
    <div className="radio-group">{children}</div>
  )
);
