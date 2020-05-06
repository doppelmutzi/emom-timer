import React from "react";
import { string, bool, func } from "prop-types";

import "./RadioButton.css";
export const RadioButton = ({ label, icon, checked, onClick }) => {
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
};

RadioButton.propTypes = {
  label: string.isRequired,
  onClick: func.isRequired,
  icon: string,
  checked: bool
};

RadioButton.defaultProps = {
  icon: null,
  checked: false
};

export const RadioGroup = ({ children }) => (
  <div className="radio-group">{children}</div>
);
