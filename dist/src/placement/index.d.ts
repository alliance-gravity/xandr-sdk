import type { XandrClient } from '..';
import type { Placement, PlacementInput, GetPlacementParams, CreatePlacementParams, ModifyPlacementParams } from './types';
export declare class XandrPlacementClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    get(params: GetPlacementParams): Promise<Placement[]>;
    add(params: CreatePlacementParams, placement: PlacementInput): Promise<Placement | undefined>;
    modify(params: ModifyPlacementParams, placement: PlacementInput): Promise<Placement | undefined>;
    remove(params: ModifyPlacementParams): Promise<void>;
}
