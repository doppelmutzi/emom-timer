import whyDidYouRender from "@welldone-software/why-did-you-render";

import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import reportWebVitals from './reportWebVitals';

whyDidYouRender(React, {
  onlyLogs: true,
  titleColor: "green",
  diffNameColor: "darkturquoise",
});

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
