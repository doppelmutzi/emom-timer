import React from "react";
import { Button } from "@material-ui/core";

import "./Button.css";

const CustomizedButton = ({ children, onClick, className, color }) => {
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
