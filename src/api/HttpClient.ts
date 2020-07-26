import {HttpMethodWithBody, HttpMethodWithoutBody, ResponseType} from "mailtrap-client";

export class HttpClient {
    constructor(
        private readonly apiKey: string,
        private readonly urlBase: string = 'https://mailtrap.io/api/v1'
    ) {
    }

    private hasBody = (method: HttpMethodWithoutBody | HttpMethodWithBody): method is HttpMethodWithBody => ['PATCH', 'POST', 'PUT'].indexOf(method) >= 0;

    public async request<T>(method: HttpMethodWithoutBody, url: string, data?: RequestInit, responseType?: ResponseType): Promise<T>;
    public async request<T>(method: HttpMethodWithBody, url: string, data?: any, init?: RequestInit, responseType?: ResponseType): Promise<T>;
    public async request<T>(method: HttpMethodWithoutBody | HttpMethodWithBody, url: string, data?: RequestInit | any, r?: RequestInit | ResponseType, responseType?: ResponseType): Promise<T> {
        const requestInit: RequestInit = this.hasBody(method) ? r : data;
        const rType: ResponseType = (this.hasBody(method) ? responseType : r as ResponseType) || 'json';
        const payload = this.hasBody(method) && typeof data !== 'undefined' ? JSON.stringify(data) : undefined;
        const response = await fetch(`${this.urlBase}${url}`, {
            ...requestInit,
            method,
            body: payload,
            headers: {
                ...requestInit?.headers,
                'Content-Type': 'application/json',
                'Api-Token': this.apiKey
            }
        });
        return rType == 'json' ? await response.json() : await response.text();
    }
}
