/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';

import type {
  CityGetParameter,
  CityResponse,
  City
} from './types';

export class XandrCityService {
  private readonly client: XandrClient;

  private readonly endpoint = 'city';

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async get (params: CityGetParameter): Promise<City[]> {
    const cities: City[] = [];
    let done = false;
    do {
      const response = await this.client.execute<CityResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: {
          start_element: cities.length,
          ...params
        }
      });
      if (response.cities) {
        cities.push(...response.cities);
      } else if (response.city) {
        cities.push(response.city);
      }
      done = response.count === cities.length;
    } while (!done);
    return cities;
  }
}