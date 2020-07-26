import {CorsDomain, CorsDomainsEndpoint as ICorsDomainsEndpoint} from 'mailtrap-client';
import {HttpClient} from "./HttpClient";

export class CorsDomainsEndpoint implements ICorsDomainsEndpoint {
    constructor(
        private readonly http: HttpClient,
    ) {
    }

    public async getCorsDomains(): Promise<CorsDomain[]> {
        return await this.http.request('GET', `/cors_domains`);
    }

    public async getCorsDomain(idCorsDomain: number): Promise<CorsDomain> {
        return await this.http.request('GET', `/cors_domains/${idCorsDomain}`);
    }

    public async createCorsDomain(idCorsDomain: number): Promise<CorsDomain> {
        return await this.http.request('POST', `/cors_domains/${idCorsDomain}`);
    }

    public async deleteCorsDomain(idCorsDomain: number): Promise<CorsDomain> {
        return await this.http.request('DELETE', `/cors_domains/${idCorsDomain}`);
    }

    public async patchCorsDomain(idCorsDomain: number, data: { cors_domain: Partial<CorsDomain> }): Promise<CorsDomain> {
        return await this.http.request('PATCH', `/cors_domains/${idCorsDomain}`, data);
    }

}
