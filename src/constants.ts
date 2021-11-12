export const DEFAULT_POINTS = [{ top: 30, left: 30 }, { top: 30, left: 70 }, { top: 70, left: 30 }, { top: 70, left: 70 }];

export const POINTER_SIZE = 20;

export const SHIFT_POINTS = [
  {
    top: POINTER_SIZE / 2,
    left: POINTER_SIZE / 2
  },
  {
    top: POINTER_SIZE / 2,
    left: POINTER_SIZE / 2
  },
  {
    top: POINTER_SIZE / 2,
    left: POINTER_SIZE / 2
  },
  {
    top: POINTER_SIZE / 2,
    left: POINTER_SIZE / 2
  },
];

export const INSET = 30;

export const DOUBLE_INSET = INSET * 2;

export enum POINT_INDEX {
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
};