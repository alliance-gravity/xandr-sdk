"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrCityService = void 0;
class XandrCityService {
    constructor(client) {
        this.endpoint = 'city';
        this.client = client;
    }
    async get(params) {
        const cities = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: {
                    start_element: cities.length,
                    ...params
                }
            });
            if (response.cities) {
                cities.push(...response.cities);
            }
            else if (response.city) {
                cities.push(response.city);
            }
            done = response.count === cities.length;
        } while (!done);
        return cities;
    }
}
exports.XandrCityService = XandrCityService;
