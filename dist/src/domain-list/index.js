"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrDomainListClient = void 0;
class XandrDomainListClient {
    constructor(client) {
        this.endpoint = 'domain-list';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async get(id) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: this.endpoint,
            query: { id }
        });
        return response['domain-list'];
    }
    async search(search) {
        const domainLists = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                query: { search, start_element: domainLists.length }
            });
            domainLists.push(...response['domain-lists']);
            done = response.count !== domainLists.length;
        } while (!done);
        return domainLists;
    }
    async getAll() {
        const domainLists = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                query: { start_element: domainLists.length }
            });
            domainLists.push(...response['domain-lists']);
            done = response.count !== domainLists.length;
        } while (!done);
        return domainLists;
    }
    async create(props) {
        const response = await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            body: { 'domain-list': props }
        });
        return response['domain-list'];
    }
    async modify(id, props) {
        const response = await this.client.execute({
            method: 'PUT',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            query: { id },
            body: { 'domain-list': props }
        });
        return response['domain-list'];
    }
    async delete(id) {
        await this.client.execute({
            method: 'DELETE',
            endpoint: this.endpoint,
            query: { id }
        });
    }
}
exports.XandrDomainListClient = XandrDomainListClient;
