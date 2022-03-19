import axios from "axios";
import { IRequestImage, IRequestPoints, RequestParams } from "./types";

const urlPrefix = 'http://localhost:5000';

export const uploadImageForCornerDetection = async (params: RequestParams<'id'>, image: IRequestImage) => {
  return axios.post(`${urlPrefix}/user/${params.id}/detect/receipt`, {
          image
        });
};

export const postCorners = async (params: RequestParams<'id'>, { image, corners }: { image: IRequestImage, corners: IRequestPoints}) => {
  return axios.post(`${urlPrefix}/user/${params.id}/image/crop`, {
    image,
    corners
  });
};

export const detectItems = async (params: RequestParams<'id'>, image: IRequestImage) => {
  return axios.post(`${urlPrefix}/user/${params.id}/detect/items`, {
    image
  });
};