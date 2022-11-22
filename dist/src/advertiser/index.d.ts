import type { XandrClient } from '..';
import type { GetAdvertiserParameters, SearchAdvertiserParameters, ModifyAdvertiserParameters, DeleteAdvertiserParameters, AdvertiserInput, Advertiser } from './types';
export declare class XandrAdvertiserClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    get(params?: GetAdvertiserParameters): Promise<Advertiser[]>;
    search(params: SearchAdvertiserParameters): Promise<Advertiser[]>;
    add(advertiser: AdvertiserInput): Promise<Advertiser | undefined>;
    modify(params: ModifyAdvertiserParameters, advertiser: AdvertiserInput): Promise<Advertiser | undefined>;
    remove(params: DeleteAdvertiserParameters): Promise<void>;
}
