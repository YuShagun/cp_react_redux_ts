import React from 'react';
import { max, min } from 'lodash';

import { Distance } from './types';
import { Point } from '../../../features/receiptUpload/receiptUploadSlice';

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
    top: min([boundsRect.height - ownRect.height, max([0, calcNewPositionValue(style.top, dist.y)])]) || 0,
    left: min([boundsRect.width - ownRect.width, max([0, calcNewPositionValue(style.left, dist.x)])]) || 0
});

const calcNewPositionValue = (oldVal: string, dist: number) => getPixelValueFromString(oldVal) + dist;

const getPixelValueFromString = (value: string) => Number(value.split('px')[0]);

const getElPosition = (el: HTMLElement | null) => ({
  top: el ? getPixelValueFromString(el.style.top) : 0,
  left: el ? getPixelValueFromString(el.style.left) : 0
});

export const getElPositionWithShift = (el: HTMLElement | null, shift: Point) => {
  const elPos = getElPosition(el);

  return {
    top: elPos.top + shift.top,
    left: elPos.left + shift.left
  };
};