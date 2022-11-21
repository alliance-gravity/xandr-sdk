/* eslint-disable @typescript-eslint/naming-convention */

export type State = 'active' | 'inactive';
export type AdType = 'audio' | 'banner' | 'native' | 'video';
export type TriggerType = 'click' | 'hybrid' | 'view';
export type TimeFormat = '12-hour' | '24-hour';
export type AuditStatus = 'approved' | 'exempt' | 'pending' | 'rejected';
export type PlacementPosition = 'above' | 'below' | 'unknown';

export interface ReadOnlyAttributes {
  last_modified: string;
}

export interface CommonResponse {
  status: string;
  count: number;
  start_element: number;
  num_elements: number;
}

export interface Id {
  id: number;
}

export interface IdName {
  id: number;
  name: string;
}

export interface IdNameValue {
  id: number;
  name: string;
  value: string;
}

/* -------- internal interfaces -------- */

/* ------------------------------------- */