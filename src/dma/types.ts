/* eslint-disable @typescript-eslint/naming-convention */
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

export type DmaGetParameter = {
  id: number;
} | {
  like_name: string;
} | {
  name: string;
};

export type DmaResponse = CommonResponse & {
  'dmas'?: Dma[];
  'dma'?: Dma;
};