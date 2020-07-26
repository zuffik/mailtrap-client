import { SharedInbox, SharedInboxesEndpoint as ISharedInboxesEndpoint } from 'mailtrap-client';
import { HttpClient } from '../http/HttpClient';

export class SharedInboxesEndpoint implements ISharedInboxesEndpoint {
  constructor(private readonly http: HttpClient) {}

  public async deleteSharedInbox(id: number): Promise<SharedInbox> {
    return await this.http.request('DELETE', `/shared_inboxes/${id}`);
  }

  public async getSharedInboxes(): Promise<SharedInbox[]> {
    return await this.http.request('GET', `/shared_inboxes`);
  }
}
