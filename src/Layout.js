import React from "react";
import "./Layout.css";

export const HorizontalContainer = React.memo(({ children }) => {
  return <div className="l-horizontal">{children}</div>;
});

export const VerticalContainer = React.memo(({ children }) => {
  return <div className="l-vertical">{children}</div>;
});
