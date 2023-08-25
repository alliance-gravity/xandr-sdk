"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrRegionService = void 0;
class XandrRegionService {
    constructor(client) {
        this.endpoint = 'region';
        this.client = client;
    }
    async get(params) {
        const regions = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: {
                    start_element: regions.length,
                    ...params
                }
            });
            if (response.regions) {
                regions.push(...response.regions);
            }
            else if (response.region) {
                regions.push(response.region);
            }
            done = response.count === regions.length;
        } while (!done);
        return regions;
    }
}
exports.XandrRegionService = XandrRegionService;
