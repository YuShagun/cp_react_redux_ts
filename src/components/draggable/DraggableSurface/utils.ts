import React from 'react';
import { max, min } from 'lodash';

import { Distance } from './types';
import { HALF_POINTER_SIZE, SHIFT_POINTS } from '../../../constants';

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
    top: min([boundsRect.height - ownRect.height / 2, max([-HALF_POINTER_SIZE, calcNewPositionValue(style.top, dist.y)])]),
    left: min([boundsRect.width - ownRect.width / 2, max([-HALF_POINTER_SIZE, calcNewPositionValue(style.left, dist.x)])])
});

const calcNewPositionValue = (oldVal: string, dist: number) => getPixelValueFromString(oldVal) + dist;

const getPixelValueFromString = (value: string) => Number(value.split('px')[0]);

export const getElPosition = (el: HTMLElement | null) => ({
  top: el ? getPixelValueFromString(el.style.top) : 0,
  left: el ? getPixelValueFromString(el.style.left) : 0
});

export const getElPositionWithShift = (el: HTMLElement | null, pointerIndex: number) => {
  const elPos = getElPosition(el);
  const shift = SHIFT_POINTS[pointerIndex];

  return {
    top: elPos.top - shift.top,
    left: elPos.left - shift.left
  };
};