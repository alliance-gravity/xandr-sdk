import type { CommonResponse } from '../xandr-types';
export interface City {
    country_code: string;
    country_name: string;
    dma_id: number;
    dma_name: string;
    id: number;
    name: string;
    region_id: number;
    region_name: string;
}
export declare type CityGetParameter = {
    country_code: string;
} | {
    dma_id: number;
} | {
    dma_name: string;
} | {
    like_name: string;
} | {
    name: string;
} | {
    id: number;
};
export declare type CityResponse = CommonResponse & {
    'cities'?: City[];
    'city'?: City;
};
