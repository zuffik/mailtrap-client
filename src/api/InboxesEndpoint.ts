import {ForwardRule, IHttpClient, Inbox, InboxesEndpoint as IInboxesEndpoint, InboxUser} from 'mailtrap-client';

export class InboxesEndpoint implements IInboxesEndpoint {
    constructor(
        private readonly http: IHttpClient,
    ) {
    }

    public async getInboxes(): Promise<Inbox[]> {
        return await this.http.request('GET', '/inboxes');
    }

    public async getInbox(idInbox: number): Promise<Inbox> {
        return await this.http.request('GET', `/inboxes/${idInbox}`);
    }

    public async patchInbox(idInbox: number, data: { inbox: Partial<Inbox> }): Promise<Inbox> {
        return await this.http.request('PATCH', `/inboxes/${idInbox}`, data);
    }

    public async deleteInbox(idInbox: number): Promise<Inbox> {
        return await this.http.request('DELETE', `/inboxes/${idInbox}`);
    }

    public async cleanInbox(idInbox: number): Promise<Inbox> {
        return await this.http.request('PATCH', `/inboxes/${idInbox}/clean`);
    }

    public async markAllAsReadInInbox(idInbox: number): Promise<Inbox> {
        return await this.http.request('PATCH', `/inboxes/${idInbox}/all_read`);
    }

    public async resetInboxCredentials(idInbox: number): Promise<Inbox> {
        return await this.http.request('PATCH', `/inboxes/${idInbox}/reset_credentials`);
    }

    public async resetInboxEmailUsername(idInbox: number): Promise<Inbox> {
        return await this.http.request('PATCH', `/inboxes/${idInbox}/reset_email_username`);
    }

    public async toggleInboxEmailUsername(idInbox: number): Promise<Inbox> {
        return await this.http.request('PATCH', `/inboxes/${idInbox}/toggle_email_username`);
    }

    public async getForwardRules(idInbox: number): Promise<ForwardRule[]> {
        return await this.http.request('GET', `/inboxes/${idInbox}/forward_rules`);
    }

    public async createForwardRule(idInbox: number): Promise<ForwardRule> {
        return await this.http.request('POST', `/inboxes/${idInbox}/forward_rules`);
    }

    public async getForwardRule(idInbox: number, idForwardRule: number): Promise<ForwardRule> {
        return await this.http.request('GET', `/inboxes/${idInbox}/forward_rules/${idForwardRule}`);
    }

    public async patchForwardRule(idInbox: number, idForwardRule: number, data: { forward_rule: Partial<ForwardRule> }): Promise<ForwardRule> {
        return await this.http.request('PATCH', `/inboxes/${idInbox}/forward_rules/${idForwardRule}`, data);
    }

    public async deleteForwardRule(idInbox: number, idForwardRule: number): Promise<ForwardRule> {
        return await this.http.request('DELETE', `/inboxes/${idInbox}/forward_rules/${idForwardRule}`);
    }

    public async getInboxUsers(idInbox: number): Promise<InboxUser[]> {
        return await this.http.request('GET', `/inboxes/${idInbox}/inboxes_users`);
    }

    public async getInboxUser(idInbox: number, idInboxUser: number): Promise<InboxUser> {
        return await this.http.request('GET', `/inboxes/${idInbox}/inboxes_users/${idInboxUser}`);
    }

    public async deleteInboxUser(idInbox: number, idInboxUser: number): Promise<InboxUser> {
        return await this.http.request('DELETE', `/inboxes/${idInbox}/inboxes_users`);
    }
}
