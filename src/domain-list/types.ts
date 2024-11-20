/* eslint-disable @typescript-eslint/naming-convention */
import type { CommonResponse } from '../xandr-types';

export interface DomainList {
  id: number;
  name: string;
  description: string;
  type: string;
  domains: string[];
  last_modified?: string;
}

export type DomainListGetParameters = {
  id: number;
} | {
  search: string;
};

export interface DomainListPostParameters {
  description?: string;
  domains?: string[];
  name: string;
  type?: string;
}

export interface DomainListPutParameters {
  id: number;
  description?: string;
  domains?: string[];
  name: string;
  type?: string;
}

export type DomainListResponse = CommonResponse & {
  'domain-list': DomainList;
};

export type DomainListsResponse = CommonResponse & {
  'domain-lists': DomainList[];
};
