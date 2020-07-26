import { IHttpClient, User, UserEndpoint as IUserEndpoint } from 'mailtrap-client';

export class UserEndpoint implements IUserEndpoint {
  constructor(private readonly http: IHttpClient) {}

  public async getUser(): Promise<User> {
    return await this.http.request('GET', '/user');
  }

  public async patchUser(data: { user: Partial<User> }): Promise<User> {
    return await this.http.request('PATCH', '/user', data);
  }

  public async patchUserResetApiToken(): Promise<User> {
    return await this.http.request('PATCH', '/user/reset_api_token');
  }
}
