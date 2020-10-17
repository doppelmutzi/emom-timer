import whyDidYouRender from "@welldone-software/why-did-you-render";

import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: "green",
  diffNameColor: "darkturquoise"
});

ReactDOM.render(<App />, document.getElementById("root"));
