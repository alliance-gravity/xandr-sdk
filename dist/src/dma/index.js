"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrDmaClient = void 0;
class XandrDmaClient {
    constructor(client) {
        this.endpoint = 'dma';
        this.client = client;
    }
    async get(params) {
        const dmas = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: {
                    start_element: dmas.length,
                    ...params
                }
            });
            if (response.dmas) {
                dmas.push(...response.dmas);
            }
            else if (response.dma) {
                dmas.push(response.dma);
            }
            done = response.count === dmas.length;
        } while (!done);
        return dmas;
    }
}
exports.XandrDmaClient = XandrDmaClient;
