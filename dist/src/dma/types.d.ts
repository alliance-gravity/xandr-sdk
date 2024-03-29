import type { CommonResponse } from '../xandr-types';
export interface Dma {
    id: number;
    name: string;
    active: boolean;
    code: string;
    country_code: string;
    country_id: number;
    country_name: string;
}
export declare type DmaGetParameter = {
    id: number;
} | {
    like_name: string;
} | {
    name: string;
};
export declare type DmaResponse = CommonResponse & {
    'dmas'?: Dma[];
    'dma'?: Dma;
};
