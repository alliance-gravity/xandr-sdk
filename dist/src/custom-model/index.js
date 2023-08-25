"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrCustomModelClient = void 0;
class XandrCustomModelClient {
    constructor(client) {
        this.endpoint = 'custom-model';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async get(id) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: this.endpoint,
            query: { id }
        });
        return response.custom_model;
    }
    async getAll() {
        const customModels = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                query: { start_element: customModels.length }
            });
            customModels.push(...response.custom_models);
            done = response.count !== customModels.length;
        } while (!done);
        return customModels;
    }
    async create(props) {
        if (props.model_text !== undefined)
            props.model_text = Buffer.from(props.model_text).toString('base64');
        const response = await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { custom_model: props }
        });
        return response.custom_model;
    }
    async modify(id, props) {
        if (props.model_text !== undefined)
            props.model_text = Buffer.from(props.model_text).toString('base64');
        const response = await this.client.execute({
            method: 'PUT',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            query: { id },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { custom_model: props }
        });
        return response.custom_model;
    }
    async delete(id) {
        await this.client.execute({
            method: 'DELETE',
            endpoint: this.endpoint,
            query: { id }
        });
    }
}
exports.XandrCustomModelClient = XandrCustomModelClient;
