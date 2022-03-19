export type RequestParams<P extends string> = {
  [T in P]: string
}

export interface IRequestImage {
  mime: string;
  data: string;
}

export interface IRequestPoints {
  [k: string]: number[];
}