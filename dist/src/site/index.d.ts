import type { XandrClient } from '..';
import type { Site, PostSiteParameters, PutSiteParameters, GetSiteParameters, ModifySiteParameters, SiteBaseResponse, SiteResponse } from './types';
export declare class XandrSiteClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    get(params?: GetSiteParameters): Promise<Site[]>;
    add(publisherId: number, site: PostSiteParameters): Promise<SiteResponse>;
    modify(params: ModifySiteParameters, site: PutSiteParameters): Promise<SiteResponse>;
    delete(params: ModifySiteParameters): Promise<SiteBaseResponse>;
}
