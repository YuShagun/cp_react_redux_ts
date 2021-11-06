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

  const firstHalf = `${lineTo(topLeft)} ${lineTo(topRight)} ${lineTo(bottomRight)} ${lineTo(corners.bottomRight)} ${lineTo(corners.topRight)}`;
  const secondHalf = `${lineTo(topLeft)} ${lineTo(bottomLeft)} ${lineTo(bottomRight)} ${lineTo(corners.bottomRight)} ${lineTo(corners.bottomLeft)}`;

  return `path('M 0 0 ${firstHalf} Z ${secondHalf} Z')`;
}

const lineTo = (point: Point) => `L ${point.left},${point.top}`;

export const getPointString = (point: Point) => `${point.left},${point.top}`;