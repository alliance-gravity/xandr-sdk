import type { XandrClient } from '..';
import type {
  Segment,
  OpenLocationCodeTargetingParameters,
  CountryRegionTargetingParameters,
  TargetingResponse
} from './types';

export class XandrAPDClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'apd-api';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Accept: 'application/appnexus.apd.vauxhall.v1.0+json'
  };

  private readonly defaultDeleteHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/appnexus.apd.vauxhall.v1.0+json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async getOpenLocationCodeTargeting (params: OpenLocationCodeTargetingParameters): Promise<Segment[]> {
    const response = await this.client.execute<TargetingResponse>({
      method: 'GET',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/olcs/${params.olc}`
    });
    return response.segments;
  }

  public async addOpenLocationCodeTargeting (params: OpenLocationCodeTargetingParameters, segments: Segment[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/olcs/${params.olc}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segval_list: segments }
    });
  }

  public async deleteOpenLocationCodeTargeting (params: OpenLocationCodeTargetingParameters, segmentList: number[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'DELETE',
      headers: this.defaultDeleteHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/olcs/${params.olc}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segment_list: segmentList }
    });
  }

  public async getCountryRegionTargetging (params: CountryRegionTargetingParameters): Promise<Segment[]> {
    const response = await this.client.execute<TargetingResponse>({
      method: 'GET',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/countries/${params.country}/regions/${params.region}`
    });
    return response.segments;
  }

  public async addCountryRegionTargeting (params: CountryRegionTargetingParameters, segments: Segment[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/countries/${params.country}/regions/${params.region}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segval_list: segments }
    });
  }

  public async deleteCountryRegionTargeting (params: CountryRegionTargetingParameters, segmentList: number[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'DELETE',
      headers: this.defaultDeleteHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/countries/${params.country}/regions/${params.region}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segment_list: segmentList }
    });
  }

}