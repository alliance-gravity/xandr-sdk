export interface Segment {
    seg_id: number;
    seg_val: number;
    seg_ttl: string;
}
interface SegmentParameters {
    segId: number;
    segVal?: number;
    segTtl?: number;
}
export interface Upload {
    added: string;
    id: string;
    member_id: number;
    message: string;
    rows_failed: number;
    rows_total: number;
    started: string;
    status: string;
    stopped: string;
}
interface UploadRowUrl {
    url: string;
    partial: boolean;
    add: boolean;
    segment: SegmentParameters;
}
interface UploadRowLocation {
    location: string;
    locationType?: number;
    add: boolean;
    segment: SegmentParameters;
}
export declare type UploadRow = UploadRowLocation | UploadRowUrl;
export interface UploadParameters {
    memberId: number;
    uploadData: UploadRow[];
}
export interface GetUploadResponse {
    uploads: Upload[] | null;
}
export interface PostUploadResponse {
    id: string;
}
export interface TargetingResponse {
    segments: Segment[];
}
export interface OpenLocationCodeTargetingParameters {
    memberId: number;
    olc: string;
}
export interface CountryRegionTargetingParameters {
    memberId: number;
    country: string;
    region: string;
}
export interface PostalCodeTargetingParameters {
    memberId: number;
    postalCode: string;
}
export interface IPRangeTargetingParameters {
    memberId: number;
    ipBegin: string;
    ipEnd: string;
}
export interface IPTargetingParameters {
    memberId: number;
    ip: string;
}
export interface UrlTargetingParameters {
    memberId: number;
    path: string;
}
export interface DeviceTargetingParameters {
    memberId: number;
    deviceId: string;
}
export {};
