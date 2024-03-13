"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrBSSClient = void 0;
const errors_1 = require("../errors");
const node_fetch_1 = __importDefault(require("node-fetch"));
const avro = __importStar(require("avsc"));
const bss_json_1 = __importDefault(require("../../assets/avro/bss.json"));
const buffer_1 = require("buffer");
class XandrBSSClient {
    constructor(client) {
        this.endpoint = 'batch-segment';
        this.client = client;
    }
    async getStatus(memberId, jobId) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: this.endpoint,
            query: { member_id: memberId, job_id: jobId }
        });
        return response.batch_segment_upload_job;
    }
    async get(memberId) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: this.endpoint,
            query: { member_id: memberId }
        });
        return response.batch_segment_upload_job;
    }
    async upload(memberId, rows, chunkSize = 1000000) {
        var _a;
        const jobs = [];
        let processed = 0;
        const encoder = avro.Type.forSchema(bss_json_1.default);
        while (processed < rows.length) {
            const chunk = rows.slice(processed, processed + chunkSize);
            processed += chunkSize;
            const response = await this.client.execute({
                method: 'POST',
                endpoint: this.endpoint,
                query: { member_id: memberId }
            });
            jobs.push(response.batch_segment_upload_job.job_id);
            const url = response.batch_segment_upload_job.upload_url;
            const data = new buffer_1.Blob(chunk.map(row => encoder.toBuffer(row)));
            const up = await (0, node_fetch_1.default)(url, {
                method: 'POST',
                headers: { 'Content-Type': 'octet-stream', Authorization: (_a = this.client.getToken()) !== null && _a !== void 0 ? _a : '' },
                body: await data.arrayBuffer()
            });
            if (up.status > 299) {
                throw new errors_1.XandrError(await up.text(), '', up.status, Object.fromEntries(up.headers.entries()));
            }
        }
        return jobs;
    }
}
exports.XandrBSSClient = XandrBSSClient;
