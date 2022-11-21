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
    const response = await this.client.execute<AdvertiserResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      query: params
        ? 'advertiserCode' in params
          ? { code: params.advertiserCode }
          : { id: params.advertiserId.join(',') }
        : undefined
    });
    if (response.advertiser) 
      return [ response.advertiser ];
    if (response.advertisers)
      return response.advertisers;
    return [];
  }

  public async search (params: SearchAdvertiserParameters): Promise<Advertiser[]> {
    const response = await this.client.execute<AdvertiserResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      query:{ search: params.searchTerm }
    });
    if (response.advertiser) 
      return [ response.advertiser ];
    if (response.advertisers)
      return response.advertisers;
    return [];
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