import React from "react";
import { Button } from "@material-ui/core";

import "./Button.css";

type CustomizedButtonType = {
  children: React.ReactNode,
  onClick: (evt: React.MouseEvent) => void,
  className: string,
  color: string,
  disabled: boolean,
};

const CustomizedButton = ({
  children,
  onClick,
  className,
  color,
  disabled,
}: CustomizedButtonType): React.ReactNode => {
  const additionClassName = className || "";
  return (
    <Button
      variant="contained"
      color={`${color || "primary"}`}
      className={`customized-button ${additionClassName}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CustomizedButton;
