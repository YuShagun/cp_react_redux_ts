import React from 'react';
import { max, min } from 'lodash';

import { Distance } from './types';

export const getPointerPosition = (event: React.MouseEvent | React.TouchEvent | TouchEvent) => {
  const mouseEvent = event as React.MouseEvent;
  const touchEvent = event as TouchEvent;

  if (touchEvent.touches) {
    return {
      y: touchEvent.touches[0].clientY,
      x: touchEvent.touches[0].clientX
    };
  } else {
    return {
      y: mouseEvent.clientY,
      x: mouseEvent.clientX
    };
  }
};

export const getNewPositionWithinBounds = (style: CSSStyleDeclaration, dist: Distance, ownRect: DOMRect, boundsRect: DOMRect) => ({
    top: min([boundsRect.height - ownRect.height, max([0, calcNewPositionValue(style.top, dist.y)])]),
    left: min([boundsRect.width - ownRect.width, max([0, calcNewPositionValue(style.left, dist.x)])])
});

const calcNewPositionValue = (oldVal: string, dist: number) => getPixelValueFromString(oldVal) + dist;

const getPixelValueFromString = (value: string) => Number(value.split('px')[0]);
