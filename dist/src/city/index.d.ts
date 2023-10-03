import type { XandrClient } from '..';
import type { CityGetParameter, City } from './types';
export declare class XandrCityClient {
    private readonly client;
    private readonly endpoint;
    constructor(client: XandrClient);
    get(params?: CityGetParameter): Promise<City[]>;
}
