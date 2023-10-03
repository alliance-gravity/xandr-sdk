import type { XandrClient } from '..';
import type { RegionGetParameter, Region } from './types';
export declare class XandrRegionClient {
    private readonly client;
    private readonly endpoint;
    constructor(client: XandrClient);
    get(params: RegionGetParameter): Promise<Region[]>;
}
