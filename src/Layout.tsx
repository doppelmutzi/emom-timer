import React from "react";
import "./Layout.css";

type Container = { children: React.ReactNode };

export const HorizontalContainer = React.memo(
  ({ children }: Container): JSX.Element => {
    return <div className="l-horizontal">{children}</div>;
  }
);

export const VerticalContainer = React.memo(
  ({ children }: Container): JSX.Element => {
    return <div className="l-vertical">{children}</div>;
  }
);
