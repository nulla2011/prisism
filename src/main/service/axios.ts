import Axios, { AxiosResponse } from 'axios';
import { BrowserWindow } from 'electron';

const API_BASE = import.meta.env['MAIN_VITE_API_TEST'];

const service = Axios.create({
  baseURL: API_BASE,
});
const controller = new AbortController();
export default async function request(url: string) {
  let resp: AxiosResponse;
  resp = await service
    .get(url, { signal: controller.signal })
    .then((response) => response.data)
    .catch((error) => {
      BrowserWindow.fromId(1)!.webContents.send(
        'err:axios',
        `Error: ${error.message} ${error.request._currentUrl}` as string,
      );
      controller.abort();
    });
  return resp;
}
