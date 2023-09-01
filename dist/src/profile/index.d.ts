import type { XandrClient } from '..';
import type { ProfileFull, ModifyProfileParameters, GetProfileParameters, ProfileParameter, AddProfileParameters, ProfileBaseResponse } from './types';
export declare class XandrProfileClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    get(params: GetProfileParameters): Promise<ProfileFull[]>;
    add(params: AddProfileParameters, profile: ProfileParameter): Promise<ProfileFull>;
    modify(params: ModifyProfileParameters, profile: ProfileParameter): Promise<ProfileBaseResponse>;
}
