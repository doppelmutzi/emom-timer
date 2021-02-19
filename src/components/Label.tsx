import { createElement } from "react";

type LabelType = {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
};

const Label = ({ text, level }: LabelType): JSX.Element =>
  createElement(`h${level}`, null, text);

export default Label;
