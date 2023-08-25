"use strict";
/* eslint-disable @typescript-eslint/naming-convention */
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrReportClient = void 0;
class XandrReportClient {
    constructor(client) {
        this.endpoint = 'report';
        this.endpointDownload = 'report-download';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async create(params) {
        const response = await this.client.execute({
            method: 'POST',
            endpoint: this.endpoint,
            headers: this.defaultHeaders,
            body: { report: params }
        });
        return response.report_id;
    }
    async getStatus(id) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: this.endpoint,
            query: { id }
        });
        return response;
    }
    async download(id) {
        const stream = await this.client.executeStream({
            method: 'GET',
            endpoint: this.endpointDownload,
            query: { id }
        });
        return stream;
    }
}
exports.XandrReportClient = XandrReportClient;
