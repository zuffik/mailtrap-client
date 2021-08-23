import { HttpMethod, HttpProvider, ResponseType } from 'mailtrap-client';
import axios from 'axios';

export const AxiosProvider: HttpProvider = async (
  method: HttpMethod,
  url: string,
  headers: Record<string, any>,
  responseType: ResponseType,
  payload?: any
) => {
  const response = await axios.request({
    method,
    url,
    headers,
    responseType,
    data: payload,
  });
  return await response.data;
};
