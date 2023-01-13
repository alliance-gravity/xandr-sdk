import type { XandrClient } from '..';
import type {
  MappingRecord,
  MappingRecordsResponse,
  PostMappingRecordParameters,
  PricingTaxonomy,
  PricingTaxonomyResponse,
  PutMappingRecordParameters
} from './types';

export class XandrSegmentBillingCategoryClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'segment-billing-category';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async getPricingTaxonomy (): Promise<PricingTaxonomy[]> {
    const response = await this.client.execute<PricingTaxonomyResponse>({
      method: 'GET',
      endpoint: 'data-provider'
    });
    return response['data-providers'][0].data_publishers[0].data_categories;
  }

  public async getMappingRecords (): Promise<MappingRecord[]> {
    const mappingRecords = [] as MappingRecord[];
    let done = false;
    do {
      const response = await this.client.execute<MappingRecordsResponse>({
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

  public async addMappingRecord (params: PostMappingRecordParameters): Promise<MappingRecord | undefined> {
    const response = await this.client.execute<MappingRecordsResponse>({
      method: 'POST',
      endpoint: this.endpoint,
      headers: this.defaultHeaders,
      body: { 'segment-billing-category': params }
    });
    return response.segment_billing_category;
  }

  public async modifyMappingRecord (params: PutMappingRecordParameters): Promise<MappingRecord | undefined> {
    const response = await this.client.execute<MappingRecordsResponse>({
      method: 'PUT',
      endpoint: this.endpoint,
      headers: this.defaultHeaders,
      body: params
    });
    return response.segment_billing_category;
  }

  public async deleteMappingRecord (id: number): Promise<void> {
    await this.client.execute<unknown>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query: { id }
    });
  }
}