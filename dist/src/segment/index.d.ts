import type { XandrClient } from '..';
import type { Segment, SegmentParameters, Advertiser, SegmentReference, AdvertiserSegmentReference } from './types';
export declare class XandrSegmentClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    create(params: SegmentParameters): Promise<Segment>;
    createAdvertiserSegment(params: SegmentParameters, advertiser: Advertiser): Promise<Segment>;
    modify(segmentReference: SegmentReference, params: SegmentParameters): Promise<Segment>;
    modifyAdvertiserSegment(advertiserSegmentReference: AdvertiserSegmentReference, params: SegmentParameters): Promise<Segment>;
    delete(id: number): Promise<void>;
    get(segmentReference: SegmentReference): Promise<Segment>;
    getAll(memberId: number, segmentList?: number[]): Promise<Segment[]>;
    search(searchTerm: string, memberId: number): Promise<Segment[]>;
}
