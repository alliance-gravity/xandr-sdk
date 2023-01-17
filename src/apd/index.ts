import type { XandrClient } from '..';
import { sleep } from '../utils';
import type {
  Segment,
  Upload,
  OpenLocationCodeTargetingParameters,
  CountryRegionTargetingParameters,
  PostalCodeTargetingParameters,
  IPRangeTargetingParameters,
  IPTargetingParameters,
  UrlTargetingParameters,
  DeviceTargetingParameters,
  UploadParameters,
  TargetingResponse,
  GetUploadResponse,
  PostUploadResponse
} from './types';
import { deduceLocationtype, sanitizeUrlFormat } from './utils';
import FormData from 'form-data';

export class XandrAPDClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'apd-api';

  private readonly defaultHeaders = {
    /* eslint-disable @typescript-eslint/naming-convention */
    Accept: 'application/appnexus.apd.vauxhall.v1.0+json',
    'Content-Type': 'application/appnexus.apd.vauxhall.v1.0+json'
    /* eslint-enable @typescript-eslint/naming-convention */
  };

  private readonly defaultDeleteHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/appnexus.apd.vauxhall.v1.0+json'
  };

  private defaultSegmentTtl = 15552000; // 180 days

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public setDefaultSegmentTtl (seconds: number): void {
    this.defaultSegmentTtl = seconds;
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
      body: segments
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
      body: segments
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
      body: segments
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
      body: segments
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
      body: segments
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
      body: segments
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
      body: segments
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
      body: segments
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
      body: segments
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

  public async getUploads (memberId: number, id?: string): Promise<Upload[] | undefined> {
    const response = await this.client.execute<GetUploadResponse>({
      method: 'GET',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/members/${memberId}/uploads`,
      query: id === undefined ? undefined : { id }
    });
    if (response.uploads === null)
      return [];
    return response.uploads;
  }

  public async upload (params: UploadParameters): Promise<string> {
    const defaultTtl = this.defaultSegmentTtl;
    const csvText = params.uploadData
      .map(function (row) {
        const operation = row.add ? 0 : 1;
        const segment = `${row.segment.segId}:${row.segment.segVal ?? 0}:${row.segment.segTtl ?? defaultTtl}`;
        if ('location' in row) {
          const keytype = row.locationType ?? deduceLocationtype(row.location);
          const key = `"${row.location}"`;
          return [keytype, key, operation, segment].join(',');
        }
        const keytype = row.partial ? 4 : 6;
        const key = `"${sanitizeUrlFormat(row.url)}"`;
        return [keytype, key, operation, segment].join(',');
      })
      .join('\n');

    if (Buffer.byteLength(csvText, 'utf8') > 256 * 1024 * 1024)
      throw new Error('Built upload content is too big');
      
    const fd = new FormData();
    fd.append('file', csvText, 'file');

    const response = await this.client.execute<PostUploadResponse>({
      method: 'POST',
      endpoint: `${this.endpoint}/members/${params.memberId}/uploads`,
      formData: fd
    });
    return response.id;
  }

  public async awaitUploadCompletion (memberId: number, id: string, maxTries = 10): Promise<Upload> {
    let tries = 0;
    do {
      const uploads = await this.getUploads(memberId, id);
      if (uploads !== undefined && uploads.length > 0 && uploads[0].status !== 'SUBMITTED_1' && uploads[0].status !== 'PROCESSING_2')
        return uploads[0];
      await sleep(
        Math.min(
          Math.pow(2, tries) * 1000,
          20 * 1000
        )
      );
      tries++;
    } while (tries < maxTries);

    throw new Error(`Upload ${id} did not complete in ${maxTries} tries`);
  }
}