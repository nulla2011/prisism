import Axios, { AxiosResponse } from 'axios';
import { BrowserWindow } from 'electron';

const API_BASE = import.meta.env['MAIN_VITE_API_TEST'];

const service = Axios.create({
  baseURL: API_BASE,
});
export default async function request(url: string) {
  let resp: AxiosResponse;
  resp = await service
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      let text: string;
      if (error.response) {
        text = `${error.response?.status} ${error.response?.statusText}\n${error.response?.request?.path}`;
      } else if (error.request) {
        text = error.request?._currentUrl;
      } else {
        text = '';
      }
      throw `Error: ${error.message}\n${text}`;
    });
  return resp;
}
