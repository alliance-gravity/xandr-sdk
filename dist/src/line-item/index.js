"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrLineItemClient = void 0;
class XandrLineItemClient {
    constructor(client) {
        this.endpoint = 'line-item';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async get(params) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: this.endpoint,
            query: 'code' in params
                // eslint-disable-next-line @typescript-eslint/naming-convention
                ? { code: params.code, advertiser_code: params.advertiserCode }
                : 'advertiserId' in params
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    ? { advertiser_id: params.advertiserId }
                    : { id: params.idList.join(',') }
        });
        return response['line-items'];
    }
    async search(searchTerm) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: this.endpoint,
            query: { search: searchTerm }
        });
        return response['line-items'];
    }
    async add(advertiserId, lineItem) {
        const response = await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            query: { advertiser_id: advertiserId },
            body: lineItem
        });
        return response['line-item'];
    }
    async modify(params, lineItem) {
        const response = await this.client.execute({
            method: 'PUT',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            query: 'id' in params
                // eslint-disable-next-line @typescript-eslint/naming-convention
                ? { id: params.id, advertiser_id: params.advertiserId }
                // eslint-disable-next-line @typescript-eslint/naming-convention
                : { code: params.code, advertiser_code: params.advertiserCode },
            body: lineItem
        });
        return response['line-item'];
    }
    async delete(params) {
        await this.client.execute({
            method: 'DELETE',
            endpoint: this.endpoint,
            query: 'id' in params
                // eslint-disable-next-line @typescript-eslint/naming-convention
                ? { id: params.id, advertiser_id: params.advertiserId }
                // eslint-disable-next-line @typescript-eslint/naming-convention
                : { code: params.code, advertiser_code: params.advertiserCode }
        });
    }
}
exports.XandrLineItemClient = XandrLineItemClient;
