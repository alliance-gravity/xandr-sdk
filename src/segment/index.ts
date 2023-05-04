import type { XandrClient } from '..';
import type {
  Segment,
  SegmentParameters,
  SegmentResponse,
  SegmentsResponse,
  Advertiser,
  SegmentReference,
  AdvertiserSegmentReference
} from './types';

export class XandrSegmentClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'segment';
  
  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async create (params: SegmentParameters): Promise<Segment> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { member_id, ...obj } = params;
    const response = await this.client.execute<SegmentResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: member_id !== undefined ? { member_id } : undefined,
      body: { segment: obj }
    });
    return response.segment;
  }

  public async createAdvertiserSegment (params: SegmentParameters, advertiser: Advertiser): Promise<Segment> {
    const response = await this.client.execute<SegmentResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: 'advertiserId' in advertiser ? { advertiser_id: advertiser.advertiserId } : { advertiser_code: advertiser.adverstiserCode },
      body: params
    });
    return response.segment;
  }

  public async modify (segmentReference: SegmentReference, params: SegmentParameters): Promise<Segment> {
    const response = await this.client.execute<SegmentResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: 'id' in segmentReference ? { id: segmentReference.id } : { code: segmentReference.code },
      body: params
    });
    return response.segment;
  }

  public async modifyAdvertiserSegment (advertiserSegmentReference: AdvertiserSegmentReference, params: SegmentParameters): Promise<Segment> {
    const response = await this.client.execute<SegmentResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      query: 'segmentId' in advertiserSegmentReference
      /* eslint-disable @typescript-eslint/naming-convention */
        ? { id: advertiserSegmentReference.segmentId, advertiser_id: advertiserSegmentReference.advertiserId }
        : { code: advertiserSegmentReference.segmentCode, advertiser_code: advertiserSegmentReference.advertiserCode },
      /* eslint-enable @typescript-eslint/naming-convention */
      body: params
    });
    return response.segment;
  }

  public async delete (id: number): Promise<void> {
    await this.client.execute<unknown>({
      method: 'DELETE',
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: { id }
    });
  }

  public async get (segmentReference: SegmentReference): Promise<Segment> {
    const response = await this.client.execute<SegmentResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: 'id' in segmentReference ? { id: segmentReference.id } : { code: segmentReference.code }
    });
    return response.segment;
  }

  public async getAll (segmentList?: number[]): Promise<Segment[]> {
    if (segmentList !== undefined) {
      const response =  await this.client.execute<SegmentsResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { id: segmentList.join(',') }
      });
      return response.segments;
    }
    let segments = [] as Segment[];
    let index = 0;
    let done = false;
    do {
      const response = await this.client.execute<SegmentsResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        query: { start_element: index }
      });
      segments = segments.concat(response.segments);
      index += response.count;
      done = response.count !== response.num_elements;
    } while (!done);
    return segments;
  }

  public async search (searchTerm: string): Promise<Segment[]>{
    let segments = [] as Segment[];
    let index = 0;
    let done = false;
    do {
      const response = await this.client.execute<SegmentsResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        query: { search: searchTerm, start_element: index }
      });
      segments = segments.concat(response.segments);
      index += response.count;
      done = response.count !== response.num_elements;
    } while (!done);
    return segments;
  }
}