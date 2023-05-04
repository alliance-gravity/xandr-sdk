"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrSegmentBillingCategoryClient = void 0;
class XandrSegmentBillingCategoryClient {
    constructor(client) {
        this.endpoint = 'segment-billing-category';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async getPricingTaxonomy() {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: 'data-provider'
        });
        return response['data-providers'][0].data_publishers[0].data_categories;
    }
    async getMappingRecords() {
        const mappingRecords = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                query: { start_element: mappingRecords.length }
            });
            if (response.segment_billing_category)
                mappingRecords.push(response.segment_billing_category);
            if (response.segment_billing_categories)
                mappingRecords.push(...response.segment_billing_categories);
            done = response.count !== mappingRecords.length;
        } while (!done);
        return mappingRecords;
    }
    async addMappingRecord(params) {
        const response = await this.client.execute({
            method: 'POST',
            endpoint: this.endpoint,
            headers: this.defaultHeaders,
            body: { 'segment-billing-category': params }
        });
        return response.segment_billing_categories;
    }
    async modifyMappingRecord(params) {
        const response = await this.client.execute({
            method: 'PUT',
            endpoint: this.endpoint,
            headers: this.defaultHeaders,
            body: params
        });
        return response.segment_billing_categories;
    }
    async deleteMappingRecord(id) {
        await this.client.execute({
            method: 'DELETE',
            endpoint: this.endpoint,
            query: { id }
        });
    }
}
exports.XandrSegmentBillingCategoryClient = XandrSegmentBillingCategoryClient;
