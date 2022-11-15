"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrPlacementClient = void 0;
class XandrPlacementClient {
    constructor(client) {
        this.endpoint = 'placement';
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
            query: 'publisherId' in params
                // eslint-disable-next-line @typescript-eslint/naming-convention
                ? { publisher_id: params.publisherId }
                : { id: params.placementIds.join(',') }
        });
        if ('placement' in response)
            return [response.placement];
        if ('placements' in response)
            return response.placements;
        return [];
    }
    async add(params, placement) {
        const response = await this.client.execute({
            method: 'POST',
            endpoint: this.endpoint,
            headers: this.defaultHeaders,
            query: 'publisherId' in params
                // eslint-disable-next-line @typescript-eslint/naming-convention
                ? { publisher_id: params.publisherId }
                // eslint-disable-next-line @typescript-eslint/naming-convention
                : { site_id: params.siteId },
            body: { placement }
        });
        return response.placement;
    }
    async modify(params, placement) {
        const response = await this.client.execute({
            method: 'PUT',
            endpoint: this.endpoint,
            headers: this.defaultHeaders,
            query: 'publisherId' in params
                // eslint-disable-next-line @typescript-eslint/naming-convention
                ? { id: params.placementId, publisher_id: params.publisherId }
                // eslint-disable-next-line @typescript-eslint/naming-convention
                : { code: params.placementId, site_id: params.siteId },
            body: { placement }
        });
        return response.placement;
    }
    async remove(params) {
        await this.client.execute({
            method: 'DELETE',
            endpoint: this.endpoint,
            query: 'publisherId' in params
                // eslint-disable-next-line @typescript-eslint/naming-convention
                ? { id: params.placementId, publisher_id: params.publisherId }
                // eslint-disable-next-line @typescript-eslint/naming-convention
                : { code: params.placementId, site_id: params.siteId }
        });
    }
}
exports.XandrPlacementClient = XandrPlacementClient;
