import {
  HttpMethodWithBody,
  HttpMethodWithoutBody,
  ResponseType,
  HttpProvider,
} from 'mailtrap-client';

export class HttpClient {
  constructor(
    private readonly apiKey: string,
    private readonly urlBase: string,
    private readonly provider: HttpProvider
  ) {}

  private hasBody = (
    method: HttpMethodWithoutBody | HttpMethodWithBody
  ): method is HttpMethodWithBody => ['PATCH', 'POST', 'PUT'].indexOf(method) >= 0;

  public async request<T>(
    method: HttpMethodWithoutBody,
    url: string,
    responseType?: ResponseType
  ): Promise<T>;
  public async request<T>(
    method: HttpMethodWithBody,
    url: string,
    data?: any,
    responseType?: ResponseType
  ): Promise<T>;
  public async request<T>(
    method: HttpMethodWithoutBody | HttpMethodWithBody,
    url: string,
    data?: any | ResponseType,
    responseType?: ResponseType
  ): Promise<T> {
    const rType: ResponseType =
      (this.hasBody(method) ? responseType : (data as ResponseType)) || 'json';
    const payload =
      this.hasBody(method) && typeof data !== 'undefined' ? JSON.stringify(data) : undefined;
    return await this.provider(
      method,
      `${this.urlBase}${url}`,
      {
        'Content-Type': 'application/json',
        'Api-Token': this.apiKey!,
      },
      rType,
      payload
    );
  }
}
