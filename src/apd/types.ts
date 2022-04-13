/* eslint-disable @typescript-eslint/naming-convention */

export interface Segment {
  seg_id: number;
  seg_val: number;
  seg_ttl: string;
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