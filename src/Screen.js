import React from "react";
import "./Screen.css";

const Screen = ({ children, className }) => {
  return <div className={`screen ${className}`}>{children}</div>;
};

export default Screen;
