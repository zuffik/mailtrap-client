import { MessagesEndpoint } from './api/MessagesEndpoint';
import { HttpClient } from './http/HttpClient';
import { UserEndpoint } from './api/UserEndpoint';
import { CompaniesEndpoint } from './api/CompaniesEndpoint';
import { SharedInboxesEndpoint } from './api/SharedInboxesEndpoint';
import { InboxesEndpoint } from './api/InboxesEndpoint';
import { CorsDomainsEndpoint } from './api/CorsDomainsEndpoint';
import { HttpProvider } from 'mailtrap-client';
import { FetchProvider } from './http/FetchHttpProvider';

export class MailtrapClient {
  public readonly user: UserEndpoint;
  public readonly companies: CompaniesEndpoint;
  public readonly inboxes: InboxesEndpoint;
  public readonly sharedInboxes: SharedInboxesEndpoint;
  public readonly messages: MessagesEndpoint;
  public readonly corsDomains: CorsDomainsEndpoint;

  constructor(private readonly apiKey: string, provider: HttpProvider = FetchProvider) {
    const urlBase = 'https://mailtrap.io/api/v1';
    const http = new HttpClient(this.apiKey, urlBase, provider);
    this.user = new UserEndpoint(http);
    this.companies = new CompaniesEndpoint(http);
    this.sharedInboxes = new SharedInboxesEndpoint(http);
    this.inboxes = new InboxesEndpoint(http);
    this.messages = new MessagesEndpoint(http);
    this.corsDomains = new CorsDomainsEndpoint(http);
  }
}
