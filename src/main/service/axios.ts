import Axios, { AxiosResponse } from 'axios';

const API_BASE = import.meta.env['MAIN_VITE_API_TEST'];

export default async function request(url: string) {
  let response: AxiosResponse;
  let service = Axios.create({
    baseURL: API_BASE,
  });
  response = await service.get(url);
  return response.data;
}
