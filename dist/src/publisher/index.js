"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrPublisherClient = void 0;
class XandrPublisherClient {
    constructor(client) {
        this.endpoint = 'publisher';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async get(params) {
        const publishers = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: { start_element: publishers.length, ...params
                        ? { id: params.publisherIds.join(',') }
                        : undefined
                }
            });
            if (response.publisher)
                publishers.push(response.publisher);
            if (response.publishers)
                publishers.push(...response.publishers);
            done = publishers.length === response.count;
        } while (!done);
        return publishers;
    }
    async add(publisher, CreateDefaultPlacement = false) {
        const response = await this.client.execute({
            method: 'POST',
            endpoint: this.endpoint,
            headers: this.defaultHeaders,
            query: { create_default_placement: CreateDefaultPlacement.toString() },
            body: { publisher }
        });
        return response.publisher;
    }
    async modify(params, publisher) {
        const response = await this.client.execute({
            method: 'PUT',
            endpoint: this.endpoint,
            headers: this.defaultHeaders,
            query: { id: params.publisherId },
            body: { publisher }
        });
        return response.publisher;
    }
    async remove(params) {
        await this.client.execute({
            method: 'DELETE',
            endpoint: this.endpoint,
            query: { id: params.publisherId }
        });
    }
}
exports.XandrPublisherClient = XandrPublisherClient;
