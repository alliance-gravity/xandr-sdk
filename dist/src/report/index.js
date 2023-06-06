"use strict";
/* eslint-disable @typescript-eslint/naming-convention */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrReportClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
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
        const url = new URL(this.client.apiUrl);
        url.pathname = this.endpointDownload;
        url.searchParams.append('id', id);
        const response = await (0, node_fetch_1.default)(url.toString(), {
            method: 'GET'
        });
        return response.body;
    }
}
exports.XandrReportClient = XandrReportClient;
