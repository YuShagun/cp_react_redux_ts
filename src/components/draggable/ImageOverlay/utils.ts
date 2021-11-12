import { SHIFT_POINTS } from "../../../constants";
import { Point } from "../../../features/receiptUpload/receiptUploadSlice";

export const computePathString = (width: number, height: number, [topLeft, topRight, bottomLeft, bottomRight]: Point[]) => {
  const corners = {
    topLeft: {
      top: 0,
      left: 0
    },
    topRight: {
      top: 0,
      left: width
    },
    bottomLeft: {
      top: height,
      left: 0
    },
    bottomRight: {
      top: height,
      left: width
    }
  };

  const firstHalf = `${lineTo(topLeft, SHIFT_POINTS[0])} ${lineTo(topRight, SHIFT_POINTS[1])} ${lineTo(bottomRight, SHIFT_POINTS[3])} ${lineTo(corners.bottomRight)} ${lineTo(corners.topRight)}`;
  const secondHalf = `${lineTo(topLeft, SHIFT_POINTS[0])} ${lineTo(bottomLeft, SHIFT_POINTS[2])} ${lineTo(bottomRight, SHIFT_POINTS[3])} ${lineTo(corners.bottomRight)} ${lineTo(corners.bottomLeft)}`;

  return `path('M 0 0 ${firstHalf} Z ${secondHalf} Z')`;
}

const lineTo = (point: Point, shift?: Point) => shift ? `L ${point.left + shift.left},${point.top + shift.top}` : `L ${point.left},${point.top}`;

export const getPointStringWithShift = (point: Point, shift: Point) => `${point.left + shift.left},${point.top + shift.top}`;