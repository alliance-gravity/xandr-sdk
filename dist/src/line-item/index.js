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
        const lineItems = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: { start_element: lineItems.length, ...'code' in params
                        ? { code: params.code, advertiser_code: params.advertiserCode }
                        : 'advertiserId' in params
                            ? { advertiser_id: params.advertiserId }
                            : { id: params.idList.join(',') }
                }
            });
            if (response['line-items']) {
                lineItems.push(...response['line-items']);
            }
            else if (response['line-item']) {
                lineItems.push(response['line-item']);
            }
            done = response.count === lineItems.length;
        } while (!done);
        return lineItems;
    }
    async search(searchTerm) {
        const lineItems = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: { search: searchTerm, start_element: lineItems.length }
            });
            if (response['line-items']) {
                lineItems.push(...response['line-items']);
            }
            else if (response['line-item']) {
                lineItems.push(response['line-item']);
            }
            done = response.count === lineItems.length;
        } while (!done);
        return lineItems;
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
    async getModel(lineItemId) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: `${this.endpoint}-model`,
            query: { id: lineItemId }
        });
        return response.line_item_models[`${lineItemId}`];
    }
    async associateOrModify(lineItemId, lineItemModelId) {
        const response = await this.client.execute({
            method: 'PUT',
            endpoint: `${this.endpoint}-model`,
            query: { id: lineItemId },
            body: Array.isArray(lineItemModelId) ? { 'line_item_models': lineItemModelId } : { 'line_item_model': lineItemModelId }
        });
        return response.line_item_model;
    }
    async deleteModel(lineItemId, lineItemModelId) {
        await this.client.execute({
            method: 'DELETE',
            endpoint: `${this.endpoint}-model`,
            query: { id: lineItemId },
            body: Array.isArray(lineItemModelId) ? { 'line_item_models': lineItemModelId } : { 'line_item_model': lineItemModelId }
        });
    }
}
exports.XandrLineItemClient = XandrLineItemClient;
