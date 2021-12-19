import { Point } from "./features/receiptUpload/receiptUploadSlice";

export const calculateDefaultPointersPositionsFromImage = (width: number, height: number) => [
  { top: 40, left: 40 },
  { top: 40, left: (width - 40) || 100 },
  { top: (height - 40) || 100, left: 40 },
  { top: (height - 40) || 100, left: (width - 40) || 100 }
];

export const readAsDataUrlAsync = (file: Blob | File) => new Promise<string>((resolve, reject) => {
  let reader = new FileReader();

  reader.onload = () => {
    resolve(String(reader.result));
  };

  reader.onerror = reject;

  reader.readAsDataURL(file);
});

export const parseBase64ImageURL = (url: string) => url.match('data:(.+);base64,(.+)');

export const mapRequestImage = (url: string) => {
  const matches = parseBase64ImageURL(url);
  return matches ? {
    mime: matches[1],
    data: matches[2]
  } : null;
};

export const mapRequestPoints = (points: Point[]) => Object.fromEntries(['tl', 'tr', 'bl', 'br'].map((val, ind) => [val, [points[ind].left, points[ind].top]]));