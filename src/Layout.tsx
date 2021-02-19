import { memo } from "react";
import "./Layout.css";

type Container = { children: React.ReactNode };

export const HorizontalContainer = memo(
  ({ children }: Container): JSX.Element => {
    return <div className="l-horizontal">{children}</div>;
  }
);

export const VerticalContainer = memo(
  ({ children }: Container): JSX.Element => {
    return <div className="l-vertical">{children}</div>;
  }
);
