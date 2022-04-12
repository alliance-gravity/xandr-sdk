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