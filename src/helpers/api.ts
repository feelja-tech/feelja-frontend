import axios, { AxiosResponse } from "axios";
import { apiUrl } from "./environment";

const API_TIMEOUT = 3000;
const S3_TIMEOUT = 60000;

export function apiPost(
  path: string,
  params: any,
  onSuccess: (res: AxiosResponse<any>) => void,
  onError: (error?: any) => void
): void {
  axios
    .post(`${apiUrl}${path}`, params, {
      timeout: API_TIMEOUT,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.status < 400) {
        onSuccess(res);
      } else {
        onError();
      }
    })
    .catch(onError);
}

export function s3Upload(
  url: string,
  blob: Blob,
  onSuccess: (res?: AxiosResponse<any>) => void,
  onError: (error?: any) => void
): void {
  axios
    .put(url, blob, {
      timeout: S3_TIMEOUT,
    })
    .then((res) => {
      if (res.status < 400) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(onError);
}
