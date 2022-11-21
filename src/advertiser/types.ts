/* eslint-disable @typescript-eslint/naming-convention */

import type {
  State,
  ReadOnlyAttributes,
  IdNameValue,
  CommonResponse,
  TimeFormat
} from '../xandr-types';

import type {
  Brand
} from '../brand/types';

import type {
  Category
} from '../category/types';

import type {
  PartnerFee
} from '../partner-fee/types';

import type {
  ThirdPartyPixel
} from '../third-party-pixel/types';

export type GetAdvertiserParameters = {
  advertiserCode: string;
} | {
  advertiserId: number[];
};

export interface SearchAdvertiserParameters {
  searchTerm: string;
}

export type ModifyAdvertiserParameters = {
  advertiserCode: string;
} | {
  advertiserId: number;
};

export interface DeleteAdvertiserParameters {
  advertiserId: number;
}

export interface AdvertiserInput {
  billing_adress1?: string | null;
  billing_adress2?: string | null;
  billing_city?: string | null;
  billing_country?: string | null;
  billing_internal_user?: string[] | null;
  billing_name?: string | null;
  billing_phone?: string | null;
  billing_state?: string | null;
  billing_zip?: string | null; 
  code?: string | null;
  competitive_brands?: Brand[] | null;
  competitive_categories?: Category[] | null;
  control_pct?: number | null;
  daily_budget?: number | null;
  daily_budget_imps?: number | null;
  default_brand?: Brand | null;
  default_brand_id?: number | null;
  default_category?: Category | null;
  default_currency?: string | null;
  enable_pacing?: boolean | null;
  enable_political_io_by_default?: boolean | null;
  is_malicious?: boolean | null;
  is_mediated?: boolean | null;
  is_running_political_ads?: boolean | null;
  labels?: IdNameValue[] | null;
  lifetime_budget?: number | null;
  lifetime_budget_imps?: number | null;
  name: string;
  profile_id?: number | null;
  remarketing_segment_id: number | null;
  state: State;
  timezone?: string | null;
  time_format?: TimeFormat | null;
  use_insertion_orders?: boolean | null;
}

export type Advertiser = ReadOnlyAttributes & Required<AdvertiserInput> & {
  id: number;
  thirdparty_pixels: ThirdPartyPixel[] | null;
  partner_fees: PartnerFee[] | null;
};

export type AdvertiserResponse = CommonResponse & {
  advertiser?: Advertiser;
  advertisers?: Advertiser[];
};