import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import Slider from "@material-ui/core/Slider";
import { Box } from "@material-ui/core";

function useColorIndication(progressPercentage: number): string {
  const [colorIndicator, setColorIndicator] = useState("red");
  useEffect(() => {
    progressPercentage > 50
      ? setColorIndicator("green")
      : setColorIndicator("red");
  }, [progressPercentage]);
  return colorIndicator;
}

type ProgressArcInterface = {
  svgWidth: number;
  arcWidth: number;
  progressPercentage: number;
  colorIndicator: string;
};

function ProgressArc({
  svgWidth,
  arcWidth,
  progressPercentage,
  colorIndicator,
}: ProgressArcInterface): React.ReactNode {
  const svgHeight = svgWidth;
  const arcOuterRadius = svgWidth / 2;
  const arcInnerRadius = svgWidth / 2 - arcWidth;
  const arcGenerator = d3
    .arc()
    .innerRadius(arcInnerRadius)
    .outerRadius(arcOuterRadius)
    .startAngle(0)
    .cornerRadius(5);
  const progressArc = (value: number): d3.Arc<unknown, unknown> =>
    arcGenerator({
      endAngle: 2 * Math.PI * value,
    });

  return (
    <div>
      <svg height={svgHeight} width={svgWidth}>
        <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>
          <path d={progressArc(1)} opacity="0.2" fill="gray" />
        </g>
        <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>
          <path
            d={progressArc(progressPercentage / 100)}
            fill={colorIndicator}
          />
          <text x="-10" y="5">
            {`${progressPercentage}%`}
          </text>
        </g>
      </svg>
    </div>
  );
}

export function ProgressCircleWrapper(): JSX.Element {
  const svgWidth = 150;
  const arcWidth = 12;
  const [progressPercentage, setProgressPercentage] = useState(50);
  const colorIndicator = useColorIndication(progressPercentage);
  function valuetext(value) {
    return `${value}°C`;
  }
  function setProgressValue(event, value) {
    setProgressPercentage(value);
  }

  return (
    <Box padding="3rem" justifyContent="center">
      <ProgressArc
        svgWidth={svgWidth}
        arcWidth={arcWidth}
        progressPercentage={progressPercentage}
        colorIndicator={colorIndicator}
      />
      <Box width="50%">
        <Slider
          defaultValue={50}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-small-steps"
          step={10}
          marks
          min={0}
          max={100}
          valueLabelDisplay="auto"
          onChange={(event, value) => {
            setProgressValue(event, value);
          }}
        />
      </Box>
    </Box>
  );
}

ProgressArc.whyDidYouRender = true;

export default React.memo(ProgressArc);
