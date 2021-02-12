import React from "react";
import "./Screen.css";

type ScreenType = {
  children: React.ReactNode,
  className?: string,
};

const Screen = ({ children, className }: ScreenType): JSX.Element => {
  return <div className={`screen ${className}`}>{children}</div>;
};

export default Screen;
