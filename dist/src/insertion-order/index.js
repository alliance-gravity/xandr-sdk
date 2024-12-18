"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrInsertionOrderClient = void 0;
class XandrInsertionOrderClient {
    constructor(client) {
        this.endpoint = 'insertion-order';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async get(params) {
        const insertionOrders = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: { start_element: insertionOrders.length,
                    ...'idList' in params
                        ? { id: params.idList.join(',') }
                        : { ...params }
                }
            });
            if (response['insertion-orders']) {
                insertionOrders.push(...response['insertion-orders']);
            }
            else if (response['insertion-order']) {
                insertionOrders.push(response['insertion-order']);
            }
            done = response.count === insertionOrders.length;
        } while (!done);
        return insertionOrders;
    }
    async search(searchTerm) {
        const insertionOrders = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: { search: searchTerm, start_element: insertionOrders.length }
            });
            if (response['insertion-orders']) {
                insertionOrders.push(...response['insertion-orders']);
            }
            else if (response['insertion-order']) {
                insertionOrders.push(response['insertion-order']);
            }
            done = response.count === insertionOrders.length;
        } while (!done);
        return insertionOrders;
    }
    async add(advertiserId, insertionOrder) {
        const response = await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            query: { advertiser_id: advertiserId },
            body: { 'insertion-order': insertionOrder }
        });
        return response;
    }
    async modify(params, insertionOrder) {
        const response = await this.client.execute({
            method: 'PUT',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            query: { id: params.id, advertiser_id: params.advertiserId },
            body: { 'insertion-order': insertionOrder }
        });
        return response;
    }
    async delete(params) {
        const response = await this.client.execute({
            method: 'DELETE',
            endpoint: this.endpoint,
            query: { id: params.id, advertiser_id: params.advertiserId }
        });
        return response;
    }
}
exports.XandrInsertionOrderClient = XandrInsertionOrderClient;
