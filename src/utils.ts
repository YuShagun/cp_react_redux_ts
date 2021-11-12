export const calculateDefaultPointersPositionsFromImage = (width: number, height: number) => [
  { top: 40, left: 40 },
  { top: 40, left: (width - 40) || 100 },
  { top: (height - 40) || 100, left: 40 },
  { top: (height - 40) || 100, left: (width - 40) || 100 }
];