import type { CommonResponse } from '../xandr-types';
export interface DomainList {
    id: number;
    name: string;
    description: string;
    type: string;
    domains: string[];
    last_modified?: string;
}
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
export declare type DomainListResponse = CommonResponse & {
    'domain-list': DomainList;
};
export declare type DomainListsResponse = CommonResponse & {
    'domain-lists': DomainList[];
};
