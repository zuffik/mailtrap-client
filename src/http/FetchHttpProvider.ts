import { HttpMethod, HttpProvider, ResponseType } from 'mailtrap-client';

export const FetchProvider: HttpProvider = async (
  method: HttpMethod,
  url: string,
  headers: Record<string, any>,
  responseType: ResponseType,
  payload?: any
) => {
  const response = await fetch(url, {
    method,
    body: payload,
    headers,
  });
  return responseType == 'json' ? await response.json() : await response.text();
};
