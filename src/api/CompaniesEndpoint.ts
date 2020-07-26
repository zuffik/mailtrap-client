import {CompaniesEndpoint as ICompaniesEndpoint, Company, Inbox, SharedUser} from 'mailtrap-client';
import {HttpClient} from "./HttpClient";

export class CompaniesEndpoint implements ICompaniesEndpoint {
    constructor(
        private readonly http: HttpClient,
    ) {
    }

    public async getCompanies(): Promise<Company[]> {
        return await this.http.request('GET', '/companies');
    }

    public async getCompany(idCompany: number): Promise<Company> {
        return await this.http.request('GET', `/companies/${idCompany}`);
    }

    public async patchCompany(idCompany: number, data: { company: Partial<Company> }): Promise<Company> {
        return await this.http.request('PATCH', `/companies/${idCompany}`, data);
    }

    public async deleteCompany(idCompany: number): Promise<Company> {
        return await this.http.request('DELETE', `/companies/${idCompany}`);
    }

    public async createCompanyInbox(idCompany: number, data: { inbox: Partial<Inbox> }): Promise<Inbox> {
        return await this.http.request('POST', `/companies/${idCompany}/inboxes`, data);
    }

    public async getSharedUsers(idCompany: number): Promise<SharedUser[]> {
        return await this.http.request('GET', `/companies/${idCompany}/shared_users`);
    }

    public async getSharedUser(idCompany: number, idSharedUser: number): Promise<SharedUser> {
        return await this.http.request('GET', `/companies/${idCompany}/shared_users/${idSharedUser}`);
    }

    public async deleteSharedUser(idCompany: number, idSharedUser: number): Promise<SharedUser> {
        return await this.http.request('DELETE', `/companies/${idCompany}/shared_users/${idSharedUser}`);
    }
}
