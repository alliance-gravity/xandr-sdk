import type { XandrClient } from '..';
import type { Placement, PlacementInput, GetPlacementParams, PostPlacementParams, PutPlacementParams } from './types';
export declare class XandrPlacementClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    get(params: GetPlacementParams): Promise<Placement[]>;
    add(params: PostPlacementParams, placement: PlacementInput): Promise<Placement>;
    modify(params: PutPlacementParams, placement: PlacementInput): Promise<Placement>;
    remove(params: PutPlacementParams): Promise<void>;
}
