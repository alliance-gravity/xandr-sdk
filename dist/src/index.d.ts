import type { AuthParameters, RequestParameters } from './types';
import { XandrCustomModelClient } from './custom-model';
import { XandrAPDClient } from './apd';
import { XandrLineItemClient } from './line-item';
import { XandrSegmentClient } from './segment';
import { XandrSegmentBillingCategoryClient } from './segment-billing-category';
export declare const defaultApiUrl = "https://api.appnexus.com";
export { sanitizeUrlFormat } from './apd/utils';
export declare class XandrClient {
    customModel: XandrCustomModelClient;
    apd: XandrAPDClient;
    lineItem: XandrLineItemClient;
    segment: XandrSegmentClient;
    segmentBillingCategory: XandrSegmentBillingCategoryClient;
    private readonly creds;
    private readonly apiUrl;
    private token;
    constructor(params: AuthParameters, apiUrl?: string);
    getToken(): string | null;
    execute<ExpectedResponseType>(params: RequestParameters): Promise<ExpectedResponseType>;
    private authenticate;
}
