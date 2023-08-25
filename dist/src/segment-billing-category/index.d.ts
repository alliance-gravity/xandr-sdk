import type { XandrClient } from '..';
import type { MappingRecord, PostMappingRecordParameters, PricingTaxonomy, PutMappingRecordParameters } from './types';
export declare class XandrSegmentBillingCategoryClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    getPricingTaxonomy(): Promise<PricingTaxonomy[]>;
    getMappingRecords(): Promise<MappingRecord[]>;
    addMappingRecord(params: PostMappingRecordParameters): Promise<MappingRecord | undefined>;
    modifyMappingRecord(params: PutMappingRecordParameters): Promise<MappingRecord | undefined>;
    deleteMappingRecord(id: number): Promise<void>;
}
