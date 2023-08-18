/// <reference types="node" />
import type { AuthParameters, RequestParameters } from './types';
import { XandrCustomModelClient } from './custom-model';
import { XandrAPDClient } from './apd';
import { XandrLineItemClient } from './line-item';
import { XandrError } from './errors';
import { XandrSegmentClient } from './segment';
import { XandrSegmentBillingCategoryClient } from './segment-billing-category';
import { XandrPlacementClient } from './placement';
import { XandrAdvertiserClient } from './advertiser';
import { XandrPublisherClient } from './publisher';
import { XandrReportClient } from './report';
import { XandrInsertionOrderClient } from './insertion-order';
import { XandrProfileClient } from './profile';
export declare const defaultApiUrl = "https://api.appnexus.com";
export { sanitizeUrlFormat } from './apd/utils';
export { XandrError };
export declare class XandrClient {
    customModel: XandrCustomModelClient;
    advertiser: XandrAdvertiserClient;
    publisher: XandrPublisherClient;
    apd: XandrAPDClient;
    lineItem: XandrLineItemClient;
    segment: XandrSegmentClient;
    segmentBillingCategory: XandrSegmentBillingCategoryClient;
    placement: XandrPlacementClient;
    report: XandrReportClient;
    insertionOrder: XandrInsertionOrderClient;
    profile: XandrProfileClient;
    readonly apiUrl: string;
    private readonly creds;
    private token;
    constructor(params: AuthParameters, apiUrl?: string);
    getToken(): string | null;
    execute<ExpectedResponseType>(params: RequestParameters): Promise<ExpectedResponseType>;
    executeStream(params: RequestParameters): Promise<NodeJS.ReadableStream>;
    private authenticate;
}
