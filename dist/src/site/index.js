"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrSiteClient = void 0;
class XandrSiteClient {
    constructor(client) {
        this.endpoint = 'site';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async get(params) {
        const sites = [];
        let done = false;
        do {
            const query = { start_element: sites.length };
            if (params) {
                if ('idList' in params) {
                    query.id = params.idList.join(',');
                }
                else if ('id' in params) {
                    query.id = params.id;
                    if (params.publisherId !== undefined)
                        query.publisher_id = params.publisherId;
                }
                else {
                    query.publisher_id = params.publisherId;
                }
            }
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query
            });
            if (response.sites) {
                sites.push(...response.sites);
            }
            else if (response.site) {
                sites.push(response.site);
            }
            done = response.count === sites.length;
        } while (!done);
        return sites;
    }
    async add(publisherId, site) {
        const response = await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            query: { publisher_id: publisherId },
            body: { site }
        });
        return response;
    }
    async modify(params, site) {
        const query = { id: params.id };
        if (params.publisherId !== undefined)
            query.publisher_id = params.publisherId;
        const response = await this.client.execute({
            method: 'PUT',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            query,
            body: { site }
        });
        return response;
    }
    async delete(params) {
        const query = { id: params.id };
        if (params.publisherId !== undefined)
            query.publisher_id = params.publisherId;
        const response = await this.client.execute({
            method: 'DELETE',
            endpoint: this.endpoint,
            query
        });
        return response;
    }
}
exports.XandrSiteClient = XandrSiteClient;
