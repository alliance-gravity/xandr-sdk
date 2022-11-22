"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrAdvertiserClient = void 0;
class XandrAdvertiserClient {
    constructor(client) {
        this.endpoint = 'advertiser';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async get(params) {
        const advertisers = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: { start_element: advertisers.length, ...params
                        ? 'advertiserCode' in params
                            ? { code: params.advertiserCode }
                            : { id: params.advertiserId.join(',') }
                        : undefined
                }
            });
            if (response.advertiser)
                advertisers.push(response.advertiser);
            if (response.advertisers)
                advertisers.push(...response.advertisers);
            done = advertisers.length === response.count;
        } while (!done);
        return advertisers;
    }
    async search(params) {
        const advertisers = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: { search: params.searchTerm, start_element: advertisers.length }
            });
            if (response.advertiser)
                advertisers.push(response.advertiser);
            if (response.advertisers)
                advertisers.push(...response.advertisers);
            done = response.count === advertisers.length;
        } while (!done);
        return advertisers;
    }
    async add(advertiser) {
        const response = await this.client.execute({
            method: 'POST',
            endpoint: this.endpoint,
            headers: this.defaultHeaders,
            body: { advertiser }
        });
        return response.advertiser;
    }
    async modify(params, advertiser) {
        const response = await this.client.execute({
            method: 'PUT',
            endpoint: this.endpoint,
            headers: this.defaultHeaders,
            query: 'advertiserId' in params
                // eslint-disable-next-line @typescript-eslint/naming-convention
                ? { id: params.advertiserId }
                // eslint-disable-next-line @typescript-eslint/naming-convention
                : { code: params.advertiserCode },
            body: { advertiser }
        });
        return response.advertiser;
    }
    async remove(params) {
        await this.client.execute({
            method: 'DELETE',
            endpoint: this.endpoint,
            query: { id: params.advertiserId }
        });
    }
}
exports.XandrAdvertiserClient = XandrAdvertiserClient;
