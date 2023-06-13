"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrSegmentClient = void 0;
class XandrSegmentClient {
    constructor(client) {
        this.endpoint = 'segment';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async create(params) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const { member_id, ...obj } = params;
        const response = await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            query: member_id !== undefined ? { member_id } : undefined,
            body: { segment: obj }
        });
        return response.segment;
    }
    async createAdvertiserSegment(params, advertiser) {
        const response = await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            query: 'advertiserId' in advertiser ? { advertiser_id: advertiser.advertiserId } : { advertiser_code: advertiser.adverstiserCode },
            body: params
        });
        return response.segment;
    }
    async modify(segmentReference, params) {
        const response = await this.client.execute({
            method: 'PUT',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            query: segmentReference,
            body: params
        });
        return response.segment;
    }
    async modifyAdvertiserSegment(advertiserSegmentReference, params) {
        const response = await this.client.execute({
            method: 'PUT',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            query: 'segmentId' in advertiserSegmentReference
                /* eslint-disable @typescript-eslint/naming-convention */
                ? { id: advertiserSegmentReference.segmentId, advertiser_id: advertiserSegmentReference.advertiserId }
                : { code: advertiserSegmentReference.segmentCode, advertiser_code: advertiserSegmentReference.advertiserCode },
            /* eslint-enable @typescript-eslint/naming-convention */
            body: params
        });
        return response.segment;
    }
    async delete(id) {
        await this.client.execute({
            method: 'DELETE',
            endpoint: this.endpoint,
            query: { id }
        });
    }
    async get(segmentReference) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: this.endpoint,
            query: segmentReference
        });
        return response.segment;
    }
    async getAll(memberId, segmentList) {
        if (segmentList !== undefined) {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                query: { id: segmentList.join(','), member_id: memberId }
            });
            return response.segments;
        }
        let segments = [];
        let index = 0;
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                query: { start_element: index, member_id: memberId }
            });
            segments = segments.concat(response.segments);
            index += response.count;
            done = response.count !== response.num_elements;
        } while (!done);
        return segments;
    }
    async search(searchTerm, memberId) {
        let segments = [];
        let index = 0;
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                query: { search: searchTerm, start_element: index, member_id: memberId }
            });
            segments = segments.concat(response.segments);
            index += response.count;
            done = response.count !== response.num_elements;
        } while (!done);
        return segments;
    }
}
exports.XandrSegmentClient = XandrSegmentClient;
