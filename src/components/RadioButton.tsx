import { memo, ReactNode } from "react";

import "./RadioButton.css";

type RadioButtonInterface = {
  label: string;
  icon: string;
  onClick: () => void;
  checked?: boolean;
};

export const RadioButton = memo(
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
  children: ReactNode;
};

export const RadioGroup = memo(
  ({ children }: RadioGroupInterface): JSX.Element => (
    <div className="radio-group">{children}</div>
  )
);
