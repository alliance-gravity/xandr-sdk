import type { CommonResponse } from '../xandr-types';
export interface Region {
    active: boolean;
    country_code: string;
    country_id: number;
    country_name: string;
    id: number;
    iso_3166_2: string;
    name: string;
    sales_tax_rate_pct: number;
}
export interface RegionGetParameter {
    country_code?: string;
    like_name?: string;
    id?: number;
    name?: string;
}
export declare type RegionResponse = CommonResponse & {
    'regions'?: Region[];
    'region'?: Region;
};
