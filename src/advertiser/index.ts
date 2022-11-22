/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';
import type {
  GetAdvertiserParameters,
  SearchAdvertiserParameters,
  ModifyAdvertiserParameters,
  DeleteAdvertiserParameters,
  AdvertiserInput,
  Advertiser,
  AdvertiserResponse
} from './types';

export class XandrAdvertiserClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'advertiser';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }


  public async get (params?: GetAdvertiserParameters): Promise<Advertiser[]> {
    const advertisers: Advertiser[] = [];
    let done = false;
    do {
      const response = await this.client.execute<AdvertiserResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { start_element: advertisers.length, ...params
          ? 'advertiserCode' in params
            ? { code: params.advertiserCode }
            : { id: params.advertiserId.join(',') }
          : undefined}
      });
      if (response.advertiser)
        advertisers.push(response.advertiser);
      if (response.advertisers)
        advertisers.push(...response.advertisers);
      done = advertisers.length === response.count;
    } while (!done);
    return advertisers;
  }

  public async search (params: SearchAdvertiserParameters): Promise<Advertiser[]> {
    const advertisers: Advertiser[] = [];
    let done = false;
    do {
      const response = await this.client.execute<AdvertiserResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { search: params.searchTerm, start_element: advertisers.length }
      });
      if (response.advertiser) 
        advertisers.push(response.advertiser);
      if (response.advertisers)
        advertisers.push(...response.advertisers);
      done = response.count === advertisers.length;
    } while (!done);
    return advertisers;
  }

  public async add (advertiser: AdvertiserInput): Promise<Advertiser | undefined> {
    const response = await this.client.execute<AdvertiserResponse>({
      method: 'POST',
      endpoint: this.endpoint,
      headers: this.defaultHeaders,
      body: { advertiser }
    });
    return response.advertiser;
  }

  public async modify (params: ModifyAdvertiserParameters, advertiser: AdvertiserInput): Promise<Advertiser | undefined> {
    const response = await this.client.execute<AdvertiserResponse>({
      method: 'PUT',
      endpoint: this.endpoint,
      headers: this.defaultHeaders,
      query: 'advertiserId' in params
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ? { id: params.advertiserId}
        // eslint-disable-next-line @typescript-eslint/naming-convention
        : { code: params.advertiserCode },
      body: { advertiser }
    });
    return response.advertiser;
  }

  public async remove (params: DeleteAdvertiserParameters): Promise<void> {
    await this.client.execute<null>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query: { id: params.advertiserId }
    });
  }
}