"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrAPDClient = void 0;
const utils_1 = require("../utils");
const utils_2 = require("./utils");
const form_data_1 = __importDefault(require("form-data"));
class XandrAPDClient {
    constructor(client) {
        this.endpoint = 'apd-api';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Accept: 'application/appnexus.apd.vauxhall.v1.0+json'
        };
        this.defaultDeleteHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/appnexus.apd.vauxhall.v1.0+json'
        };
        this.defaultSegmentTtl = 15552000; // 180 days
        this.client = client;
    }
    setDefaultSegmentTtl(seconds) {
        this.defaultSegmentTtl = seconds;
    }
    async getOpenLocationCodeTargeting(params) {
        const response = await this.client.execute({
            method: 'GET',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/olcs/${params.olc}`
        });
        return response.segments;
    }
    async addOpenLocationCodeTargeting(params, segments) {
        await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/olcs/${params.olc}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segval_list: segments }
        });
    }
    async deleteOpenLocationCodeTargeting(params, segmentList) {
        await this.client.execute({
            method: 'DELETE',
            headers: this.defaultDeleteHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/olcs/${params.olc}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segment_list: segmentList }
        });
    }
    async getCountryRegionTargetging(params) {
        const response = await this.client.execute({
            method: 'GET',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/countries/${params.country}/regions/${params.region}`
        });
        return response.segments;
    }
    async addCountryRegionTargeting(params, segments) {
        await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/countries/${params.country}/regions/${params.region}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segval_list: segments }
        });
    }
    async deleteCountryRegionTargeting(params, segmentList) {
        await this.client.execute({
            method: 'DELETE',
            headers: this.defaultDeleteHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/countries/${params.country}/regions/${params.region}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segment_list: segmentList }
        });
    }
    async getPostalCodeTargeting(params) {
        const response = await this.client.execute({
            method: 'GET',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/postal-codes/${params.postalCode}`
        });
        return response.segments;
    }
    async addPostalCodeTargeting(params, segments) {
        await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/postal-codes/${params.postalCode}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segval_list: segments }
        });
    }
    async deletePostalCodeTargeting(params, segmentList) {
        await this.client.execute({
            method: 'DELETE',
            headers: this.defaultDeleteHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/postal-codes/${params.postalCode}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segment_list: segmentList }
        });
    }
    async getIPRangeTargeting(params) {
        const response = await this.client.execute({
            method: 'GET',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/ip-ranges/${params.ipBegin}/${params.ipEnd}`
        });
        return response.segments;
    }
    async addIPRangeTargeting(params, segments) {
        await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/ip-ranges/${params.ipBegin}/${params.ipEnd}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segval_list: segments }
        });
    }
    async deleteIPRangeTargeting(params, segmentList) {
        await this.client.execute({
            method: 'DELETE',
            headers: this.defaultDeleteHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/ip-ranges/${params.ipBegin}/${params.ipEnd}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segment_list: segmentList }
        });
    }
    async getIPTargeting(params) {
        const response = await this.client.execute({
            method: 'GET',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/ips/${params.ip}`
        });
        return response.segments;
    }
    async addIPTargeting(params, segments) {
        await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/ips/${params.ip}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segval_list: segments }
        });
    }
    async deleteIPTargeting(params, segmentList) {
        await this.client.execute({
            method: 'DELETE',
            headers: this.defaultDeleteHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/ips/${params.ip}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segment_list: segmentList }
        });
    }
    async getUrlComponentTargeting(params) {
        const response = await this.client.execute({
            method: 'GET',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/urls/components`,
            query: { path: params.path }
        });
        return response.segments;
    }
    async addUrlComponentTargeting(params, segments) {
        await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/urls/components`,
            query: { path: params.path },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segval_list: segments }
        });
    }
    async deleteUrlComponentTargeting(params, segmentList) {
        await this.client.execute({
            method: 'DELETE',
            headers: this.defaultDeleteHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/urls/components`,
            query: { path: params.path },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segment_list: segmentList }
        });
    }
    async getUrlReferenceTargeting(params) {
        const response = await this.client.execute({
            method: 'GET',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/urls/reference`,
            query: { path: params.path }
        });
        return response.segments;
    }
    async addUrlReferenceTargeting(params, segments) {
        await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/urls/reference`,
            query: { path: params.path },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segval_list: segments }
        });
    }
    async deleteUrlReferenceTargeting(params, segmentList) {
        await this.client.execute({
            method: 'DELETE',
            headers: this.defaultDeleteHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/urls/reference`,
            query: { path: params.path },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segment_list: segmentList }
        });
    }
    async getDeviceTargeting(params) {
        const response = await this.client.execute({
            method: 'GET',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/dev-ids/${params.deviceId}`
        });
        return response.segments;
    }
    async addDeviceTargeting(params, segments) {
        await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/dev-ids/${params.deviceId}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segval_list: segments }
        });
    }
    async deleteDeviceTargeting(params, segmentList) {
        await this.client.execute({
            method: 'DELETE',
            headers: this.defaultDeleteHeaders,
            endpoint: `${this.endpoint}/members/${params.memberId}/dev-ids/${params.deviceId}`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segment_list: segmentList }
        });
    }
    async getEvent(memberId, segmentList) {
        const response = await this.client.execute({
            method: 'GET',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${memberId}/events`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            query: { segment_list: segmentList.join(',') }
        });
        return response.segments;
    }
    async addEvent(memberId, segments) {
        await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${memberId}/events`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            body: { segval_list: segments }
        });
    }
    async deleteEvent(memberId, segmentList) {
        await this.client.execute({
            method: 'DELETE',
            headers: this.defaultDeleteHeaders,
            endpoint: `${this.endpoint}/members/${memberId}/events`,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            query: { segment_list: segmentList.join(',') }
        });
    }
    async getUploads(memberId, id) {
        const response = await this.client.execute({
            method: 'GET',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/members/${memberId}/uploads`,
            query: id === undefined ? undefined : { id }
        });
        if (response.uploads === null)
            return [];
        return response.uploads;
    }
    async upload(params) {
        const defaultTtl = this.defaultSegmentTtl;
        const csvText = params.uploadData
            .map(function (row) {
            var _a, _b, _c;
            const operation = row.add ? 0 : 1;
            const segment = `${row.segment.segId}:${(_a = row.segment.segVal) !== null && _a !== void 0 ? _a : 0}:${(_b = row.segment.segTtl) !== null && _b !== void 0 ? _b : defaultTtl}`;
            if ('location' in row) {
                const keytype = (_c = row.locationType) !== null && _c !== void 0 ? _c : (0, utils_2.deduceLocationtype)(row.location);
                const key = `"${row.location}"`;
                return [keytype, key, operation, segment].join(',');
            }
            const keytype = row.partial ? 4 : 6;
            const key = `"${(0, utils_2.sanitizeUrlFormat)(row.url)}"`;
            return [keytype, key, operation, segment].join(',');
        })
            .join('\n');
        if (Buffer.byteLength(csvText, 'utf8') > 256 * 1024 * 1024)
            throw new Error('Built upload content is too big');
        const fd = new form_data_1.default();
        fd.append('file', csvText, 'file');
        const response = await this.client.execute({
            method: 'POST',
            endpoint: `${this.endpoint}/members/${params.memberId}/uploads`,
            formData: fd
        });
        return response.id;
    }
    async awaitUploadCompletion(memberId, id, maxTries = 10) {
        let tries = 0;
        do {
            const uploads = await this.getUploads(memberId, id);
            if (uploads !== undefined && uploads.length > 0 && uploads[0].status !== 'SUBMITTED_1')
                return uploads[0];
            await (0, utils_1.sleep)(Math.min(Math.pow(2, tries) * 1000, 20 * 1000));
            tries++;
        } while (tries < maxTries);
        throw new Error(`Upload ${id} did not complete in ${maxTries} tries`);
    }
}
exports.XandrAPDClient = XandrAPDClient;
