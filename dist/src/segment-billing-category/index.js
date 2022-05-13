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
        let mappingRecords = [];
        let index = 0;
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                query: { start_element: index }
            });
            mappingRecords = mappingRecords.concat(response.segment_billing_categories);
            index += response.count;
            done = response.count !== response.num_elements;
        } while (!done);
        return mappingRecords;
    }
    async addMappingRecord(params) {
        const response = await this.client.execute({
            method: 'POST',
            endpoint: this.endpoint,
            headers: this.defaultHeaders,
            body: params
        });
        return response.segment_billing_categories[0];
    }
    async modifyMappingRecord(params) {
        const response = await this.client.execute({
            method: 'PUT',
            endpoint: this.endpoint,
            headers: this.defaultHeaders,
            body: params
        });
        return response.segment_billing_categories[0];
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
