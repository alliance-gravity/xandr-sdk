import type { XandrClient } from '..';
import type {
  Segment,
  OpenLocationCodeTargetingParameters,
  CountryRegionTargetingParameters,
  PostalCodeTargetingParameters,
  IPRangeTargetingParameters,
  IPTargetingParameters,
  UrlTargetingParameters,
  DeviceTargetingParameters,
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

  public async getPostalCodeTargeting (params: PostalCodeTargetingParameters): Promise<Segment[]> {
    const response = await this.client.execute<TargetingResponse>({
      method: 'GET',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/postal-codes/${params.postalCode}`
    });
    return response.segments;
  }

  public async addPostalCodeTargeting (params: PostalCodeTargetingParameters, segments: Segment[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/postal-codes/${params.postalCode}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segval_list: segments }
    });
  }

  public async deletePostalCodeTargeting (params: PostalCodeTargetingParameters, segmentList: number[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'DELETE',
      headers: this.defaultDeleteHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/postal-codes/${params.postalCode}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segment_list: segmentList }
    });
  }

  public async getIPRangeTargeting (params: IPRangeTargetingParameters): Promise<Segment[]> {
    const response = await this.client.execute<TargetingResponse>({
      method: 'GET',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/ip-ranges/${params.ipBegin}/${params.ipEnd}`
    });
    return response.segments;
  }

  public async addIPRangeTargeting (params: IPRangeTargetingParameters, segments: Segment[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/ip-ranges/${params.ipBegin}/${params.ipEnd}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segval_list: segments }
    });
  }

  public async deleteIPRangeTargeting (params: IPRangeTargetingParameters, segmentList: number[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'DELETE',
      headers: this.defaultDeleteHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/ip-ranges/${params.ipBegin}/${params.ipEnd}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segment_list: segmentList }
    });
  }

  public async getIPTargeting (params: IPTargetingParameters): Promise<Segment[]> {
    const response = await this.client.execute<TargetingResponse>({
      method: 'GET',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/ips/${params.ip}`
    });
    return response.segments;
  }

  public async addIPTargeting (params: IPTargetingParameters, segments: Segment[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/ips/${params.ip}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segval_list: segments }
    });
  }

  public async deleteIPTargeting (params: IPTargetingParameters, segmentList: number[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'DELETE',
      headers: this.defaultDeleteHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/ips/${params.ip}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segment_list: segmentList }
    });
  }

  public async getUrlComponentTargeting (params: UrlTargetingParameters): Promise<Segment[]> {
    const response = await this.client.execute<TargetingResponse>({
      method: 'GET',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/urls/components`,
      query: { path: params.path }
    });
    return response.segments;
  }

  public async addUrlComponentTargeting (params: UrlTargetingParameters, segments: Segment[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/urls/components`,
      query: { path: params.path },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segval_list: segments }
    });
  }

  public async deleteUrlComponentTargeting (params: UrlTargetingParameters, segmentList: number[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'DELETE',
      headers: this.defaultDeleteHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/urls/components`,
      query: { path: params.path },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segment_list: segmentList }
    });
  }

  public async getUrlReferenceTargeting (params: UrlTargetingParameters): Promise<Segment[]> {
    const response = await this.client.execute<TargetingResponse>({
      method: 'GET',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/urls/reference`,
      query: { path: params.path }
    });
    return response.segments;
  }

  public async addUrlReferenceTargeting (params: UrlTargetingParameters, segments: Segment[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/urls/reference`,
      query: { path: params.path },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segval_list: segments }
    });
  }

  public async deleteUrlReferenceTargeting (params: UrlTargetingParameters, segmentList: number[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'DELETE',
      headers: this.defaultDeleteHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/urls/reference`,
      query: { path: params.path },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segment_list: segmentList }
    });
  }

  public async getDeviceTargeting (params: DeviceTargetingParameters): Promise<Segment[]> {
    const response = await this.client.execute<TargetingResponse>({
      method: 'GET',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/dev-ids/${params.deviceId}`
    });
    return response.segments;
  }

  public async addDeviceTargeting (params: DeviceTargetingParameters, segments: Segment[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/dev-ids/${params.deviceId}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segval_list: segments }
    });
  }

  public async deleteDeviceTargeting (params: DeviceTargetingParameters, segmentList: number[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'DELETE',
      headers: this.defaultDeleteHeaders,
      endpoint: `${this.endpoint}/members/${params.memberId}/dev-ids/${params.deviceId}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segment_list: segmentList }
    });
  }

  public async getEvent (memberId: number, segmentList: number[]): Promise<Segment[]> {
    const response = await this.client.execute<TargetingResponse>({
      method: 'GET',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${memberId}/events`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: { segment_list: segmentList.join(',') }
    });
    return response.segments;
  }

  public async addEvent (memberId: number, segments: Segment[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${memberId}/events`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { segval_list: segments }
    });
  }

  public async deleteEvent (memberId: number, segmentList: number[]): Promise<void> {
    await this.client.execute<unknown>({
      method: 'DELETE',
      headers: this.defaultDeleteHeaders,
      endpoint: `${this.endpoint}/members/${memberId}/events`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: { segment_list: segmentList.join(',') }
    });
  }
}