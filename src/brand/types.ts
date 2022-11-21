/* eslint-disable @typescript-eslint/naming-convention */

import type {
  IdName
} from '../xandr-types';


export interface Brand {
  category_id: number;
  company_id: number;
  id: number;
  is_premium: number;
  last_modified: string;
  name: string;
  urls: string[];
}

export interface CountriesAndBrands {
  brand_id: number;
  brand_name: string;
  brand: IdName[];
  country: string;
}