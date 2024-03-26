"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrBSSClient = void 0;
const errors_1 = require("../errors");
const node_fetch_1 = __importDefault(require("node-fetch"));
const avsc_1 = __importDefault(require("avsc"));
const fs_1 = __importDefault(require("fs"));
const longType = avsc_1.default.types.LongType.__with({
    fromBuffer: (buf) => buf.readBigInt64LE(),
    toBuffer: (n) => {
        const buf = Buffer.alloc(8);
        buf.writeBigInt64LE(n);
        return buf;
    },
    fromJSON: BigInt,
    toJSON: Number,
    isValid: (n) => typeof n == 'bigint',
    compare: (n1, n2) => {
        // eslint-disable-next-line @typescript-eslint/no-extra-parens
        return n1 === n2 ? 0 : (n1 < n2 ? -1 : 1);
    }
});
const bss_json_1 = __importDefault(require("../../assets/avro/bss.json"));
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
    async upload(memberId, rows, chunkSize = 1000000) {
        var _a;
        const jobs = [];
        const tempFile = 'upload.avro';
        let processed = 0;
        const encoder = avsc_1.default.Type.forSchema(bss_json_1.default, {
            registry: {
                'long': longType
            }
        });
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
            const writer = avsc_1.default.createFileEncoder(tempFile, encoder, { codec: 'deflate' });
            chunk.map(row => writer.write(row));
            writer.end();
            await new Promise(resolve => writer.on('end', resolve));
            const up = await (0, node_fetch_1.default)(url, {
                method: 'POST',
                headers: { 'Content-Type': 'octet-stream', Authorization: (_a = this.client.getToken()) !== null && _a !== void 0 ? _a : '' },
                body: await fs_1.default.promises.readFile(tempFile)
            });
            if (up.status > 299) {
                throw new errors_1.XandrError(await up.text(), '', up.status, Object.fromEntries(up.headers.entries()));
            }
            await fs_1.default.promises.unlink(tempFile);
        }
        return jobs;
    }
}
exports.XandrBSSClient = XandrBSSClient;
