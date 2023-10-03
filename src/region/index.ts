/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';

import type {
  RegionGetParameter,
  RegionResponse,
  Region
} from './types';

export class XandrRegionClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'region';

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async get (params: RegionGetParameter): Promise<Region[]> {
    const regions: Region[] = [];
    let done = false;
    do {
      const response = await this.client.execute<RegionResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: {
          start_element: regions.length,
          ...params
        }
      });
      if (response.regions) {
        regions.push(...response.regions);
      } else if (response.region) {
        regions.push(response.region);
      }
      done = response.count === regions.length;
    } while (!done);
    return regions;
  }
}