"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrProfileClient = void 0;
class XandrProfileClient {
    constructor(client) {
        this.endpoint = 'profiles';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async get(params) {
        const profiles = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: { start_element: profiles.length, ...params }
            });
            profiles.push(...response.profiles);
            done = response.count === profiles.length;
        } while (!done);
        return profiles;
    }
    async add(params, profile) {
        const response = await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            query: { ...params },
            body: profile
        });
        return response.profile;
    }
    async modify(params, profile) {
        const response = await this.client.execute({
            method: 'PUT',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            query: { ...params },
            body: profile
        });
        return response;
    }
}
exports.XandrProfileClient = XandrProfileClient;