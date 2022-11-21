/* eslint-disable @typescript-eslint/naming-convention */

import type {
  Advertiser
} from '../advertiser/types';

import type {
  InventoryAttribute
} from '../inventory-attribute/types';

import type {
  LineItem
} from '../line-item/types';

import type {
  Segment
} from '../segment/types';

import type {
  CommonResponse,
  State,
  PlacementPosition,
  IdName
} from '../xandr-types';



interface DefaultCreative {
  id: number;
  width: number;
  height: number;
  price: number;
  name: string;
}

interface ContentCategory {
  code: string;
  description: string;
  id: number;
  is_system: boolean;
  last_modified: string;
  member_id: number;
  name: string;
  parent_category: {
    id: number;
    name: string;
  };
  type:  'deal_priority' | 'deal' | 'standard';
}

interface PlacementAdType {
  id: number;
  renderer_id: number;
  name: string;
  display_name: string;
  renderer: {
    id: string;
    display_name: string;
  };
}

interface VideoSettings {
  id: number;
  width: number;
  max_duration_secs: number;
  maximum_ad_duration_secs: number;
  maximum_number_ads: number;
  start_delay_secs: number;
  skipoffset_seconds: number;
  supports_skippable: boolean;
  context: string;
  playback_method: 'auto_play_sound_off' | 'auto_play_sound_off' | 'auto_play_sound_on' | 'auto_play_sound_unknown' | 'mouse_over' | null;
  frameworks: ('mraid_1' | 'mraid_2' | 'ormma' | 'vpaid_1_0' | 'vpaid_2_0')[];
  video_bumpers: {
    video_bumper_type: 'intro' | 'outro';
    max_duration_secs: number | null;
  };
  player_vast_version: string;
  vmin_ad_duration: number;
  minbitrate: number;
  mf_min_width: number;
  mf_min_height: number;
}

export interface PlacementInput {
  name: string;
  code?: string | null;
  code2?: string | null;
  code3?: string | null;
  state?: State;
  width?: number | null;
  height?: number | null;
  is_resizable?: boolean;
  default_position?: PlacementPosition;
  publisher_id: number;
  site_id?: number;
  ad_profile_id?: number | null;
  supported_media_types?: IdName[] | null;
  supported_media_subtypes?: IdName[] | null;
  default_creatives?: DefaultCreative[];
  reserve_price?: number;
  hide_referer?: boolean;
  default_referrer_url?: string | null;
  visibility_profile_id?: number;
  pixel_url?: string | null;
  pixel_type?: 'image' | 'javascript';
  content_categories?: ContentCategory[];
  filtered_advertisers?: Advertiser[] | null;
  filtered_line_items?: LineItem[] | null;
  filtered_campaigns?: null;
  segments?: Segment[] | null;
  intended_audience?: 'children' | 'general' | 'mature' | 'young_adult';
  inventory_attributes?: InventoryAttribute[] | null;
  audited?: boolean;
  audit_level?: 'placement' | 'site';
  default_calculcation_type?: 'gross' | 'net';
  demand_filter_action?: string;
  floor_application_target?: 'all' | 'external_non_preferred' | 'external_only';
  pixel_url_secure?: string;
  site_audit_status?: 'self' | 'unaudited';
  is_prohibited?: boolean;
  cost_cpm?: number;
  content_retrieval_timeout_ms?: number;
  enable_for_mediation?: boolean;
  private_sizes?: {
    width: number;
    height: number;
  }[];
  video?: VideoSettings;
  ad_types: PlacementAdType[];
  use_detected_domain?: boolean;
  mime_types?: string[];
  supported_mime_types_action_include?: boolean;
  handles_mixed_media?: boolean;
  tinytag_renderer_asset_floor_prices: {
    renderer_id: number;
    ad_type_id: number;
    asset_type: number;
    floor_price: number;
  }[];
}

export type Placement = Required<PlacementInput> & {
  id: number;
  site_name: string;
  exclusive: boolean;
};

export type GetPlacementParams = {
  placementIds: number[];
} | {
  publisherId: number;
};

export type CreatePlacementParams = {
  publisherId: number;
} | {
  siteId: number;
};

export type ModifyPlacementParams = {
  placementId: number;
} & ({
  publisherId: number;
} | {
  siteId: number;
});

export type PlacementResponse = CommonResponse & {
  placement?: Placement;
  placements?: Placement[];
};