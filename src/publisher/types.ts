/* eslint-disable @typescript-eslint/naming-convention */

import type {
  CommonResponse,
  IdNameValue,
  ReadOnlyAttributes,
  State
} from '../xandr-types';

export interface GetPublisherParameters {
  publisherIds: number[];
}

export interface ModifyPublisherParameters {
  publisherId: number;
}

export interface DeletePublisherParameters {
  publisherId: number;
}


export interface PublisherInput {
  code?: string | null;
  name: string;
  state?: State;
  expose_domains?: boolean;
  enable_cookie_tracking_default?: boolean;
  reselling_exposure: 'private' | 'public';
  reselling_name?: string | null;
  description?: string | null;
  is_rtb?: boolean;
  timezone?: string;
  max_learn_pct?: number;
  learn_bypass_cpm?: number;
  ad_quality_advanced_mode_enabled?: boolean;
  allow_report_on_default_imps?: boolean;
  default_site_id?: number;
  default_ad_profile_id?: number;
  billing_dba?: string | null;
  billing_address1?: string | null;
  billing_address2?: string | null;
  billing_city?: string | null;
  billing_state?: string | null;
  billing_zip?: string | null;
  billing_country?: string | null;
  accept_supply_partner_usersync?: boolean;
  accept_demand_partner_usersync?: boolean;
  accept_data_provider_usersync?: boolean;
  ym_profile_id?: number;
  allow_cpm_managed?: boolean;
  allow_cpm_external?: boolean;
  allow_cpa_managed?: boolean;
  allow_cpa_external?: boolean;
  allow_cpc_managed?: boolean;
  allow_cpc_external?: boolean;
  managed_cpc_bias_pct?: number;
  managed_cpa_bias_pct?: number;
  external_cpc_bias_pct?: number;
  external_cpa_bias_pct?: number;
  is_oo?: boolean;
  base_payment_rule_id?: number;
  base_ad_quality_rule_id?: number;
  currency?: string;
  visibility_profile_id?: number;
  billing_internal_user?: number;
  labels: IdNameValue[];
  placements?: { id: number; code: string }[] | null;
  external_inv_codes?: { id: number; code: string }[] | null;
  publisher_brand_exceptions?: { brand_id: number }[];
  seller_page_cap_enabled: boolean;
  inventory_relationship: 'direct' | 'indirect_multiple_publishers' | 'indirect_single_publisher' | 'owned_operated' | 'unknown';
  inventory_source: 'aol' | 'openx' | 'other' | 'pubmatic' | 'rubicon';
  inventory_source_name?: string | null;
  contact?: { name: string; phone: string; email: string}[] | null;
  use_anx_auction_logic?: boolean;
}

export type Publisher = ReadOnlyAttributes & Required<PublisherInput> & {
  id: number;
  reselling_exposed_on: string;
  cpm_reselling_disabled: boolean;
  cpc_reselling_disabled: boolean;
  platform_ops_notes: string | null;

};

export type PublisherResponse = CommonResponse & {
  publisher?: Publisher;
  publishers?: Publisher[];
};