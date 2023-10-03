/* eslint-disable @typescript-eslint/naming-convention */
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

export type CityGetParameter = {
  id: number;
} | {
  like_name: string;
} | {
  name: string;
};

export type CityResponse = CommonResponse & {
  'cities'?: City[];
  'city'?: City;
};