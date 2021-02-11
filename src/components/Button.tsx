import React from "react";
import { Button } from "@material-ui/core";

import "./Button.css";

type CustomizedButtonType = {
  children: string;
  onClick: (evt: React.MouseEvent) => void;
  className?: string;
  color?: "inherit" | "primary" | "secondary" | "default" | undefined;
  disabled?: boolean;
};

const CustomizedButton = ({
  children,
  onClick,
  className,
  color,
  disabled,
}: CustomizedButtonType): JSX.Element => {
  const additionClassName = className || "";
  return (
    <div className="customized-button">
      <Button
        variant="contained"
        color={color || "primary"}
        className={additionClassName}
        onClick={onClick}
        disabled={disabled || false}
      >
        {children}
      </Button>
    </div>
  );
};

export default CustomizedButton;
