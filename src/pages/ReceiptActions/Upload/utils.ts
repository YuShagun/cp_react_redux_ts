type DetectedPoint = Array<number>;

type DetectionObj = {
  ll: DetectedPoint;
  lr: DetectedPoint;
  ul: DetectedPoint;
  ur: DetectedPoint;
};

const mapResponsePoint = (point: ArrayLike<number>) => ({
  left: point[0],
  top: point[1]
});

export const mapPointsFromResponse = (detection: DetectionObj) => {
  const detectionPoints = [detection.ul, detection.ur, detection.ll, detection.lr];
  return detectionPoints.map(mapResponsePoint);
};