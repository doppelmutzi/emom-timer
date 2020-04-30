import React from "react";
import "./Layout.css";

export const HorizontalContainer = ({ children }) => {
  return <div className="l-horizontal">{children}</div>;
};

export const VerticalContainer = ({ children }) => {
  return <div className="l-vertical">{children}</div>;
};
