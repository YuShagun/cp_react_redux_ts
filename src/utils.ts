import { IRequestImage, IRequestPoints } from "./app/requests/types";
import { HALF_POINTER_SIZE } from "./constants";
import { ReceiptField } from "./features/receiptForm/receiptFormSlice";
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

export const mapRequestImage = (url: string): IRequestImage | null => {
  const matches = parseBase64ImageURL(url);
  return matches ? {
    mime: matches[1],
    data: matches[2]
  } : null;
};

export const mapRequestPoints = (points: Point[], mul: Point): IRequestPoints => {
  const scaledPoints = points.map(point => ({
    left: Math.round((point.left + HALF_POINTER_SIZE) * mul.left),
    top: Math.round((point.top + HALF_POINTER_SIZE) * mul.top)
  }));

  return Object.fromEntries(['ul', 'ur', 'bl', 'br'].map((val, ind) => [val, [scaledPoints[ind].left, scaledPoints[ind].top]]));
};

export const mapItemsResonse = (items: String[]) =>  Object.fromEntries(items.map<ReceiptField>(val => ({
  name: String(val),
  price: '',
  type: 0
})).entries());