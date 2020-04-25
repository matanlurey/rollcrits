import React from 'react';
import { Slider } from 'antd';

import App from '../app/App';

function iterationsToSlider(iterations: number): number {
  return iterations.toString().length - 1;
}

function slideToIterations(slider: number): number {
  switch (slider) {
    case 1:
      return 10;
    case 2:
      return 100;
    case 3:
      return 1000;
    case 4:
      return 10000;
    case 5:
      return 100000;
    default:
      return App.defaultState.iterations;
  }
}

export default function (props: {
  value: number;
  onChanged: (value: number) => void;
}) {
  return (
    <Slider
      min={1}
      max={5}
      marks={{
        1: '10',
        3: '1000',
        5: '100000',
      }}
      value={iterationsToSlider(props.value)}
      tipFormatter={slideToIterations}
      onChange={(value) => props.onChanged(slideToIterations(value as number))}
    ></Slider>
  );
}
