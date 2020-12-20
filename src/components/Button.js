import React from "react";
import { Button } from "@material-ui/core";

import "./Button.css";

type CustomizedButtonType = {
  children: React.ReactNode,
  onClick: (evt: React.MouseEvent) => void,
  className: string,
  color: string,
};

const CustomizedButton = ({
  children,
  onClick,
  className,
  color,
}: CustomizedButtonType): React.ReactNode => {
  const additionClassName = className || "";
  return (
    <Button
      variant="contained"
      color={`${color || "primary"}`}
      className={`customized-button ${additionClassName}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomizedButton;
