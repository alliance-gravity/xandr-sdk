/* eslint-disable @typescript-eslint/naming-convention */

type State = 'active' | 'inactive';
type AdType = 'audio' | 'banner' | 'native' | 'video';
type TriggerType = 'click' | 'hybrid' | 'view';


interface BudgetInterval {
  id: number;
  start_date: string;
  end_date: string;
  timezone: string;
  parent_interval_id: number;
  lifetime_budget: number;
  lifetime_budget_imps: number;
  lifetime_pacing: boolean;
  daily_budget: number;
  daily_budget_imps: number;
  enable_pacing: boolean;
  creatives: Creative[];
}

interface Creative {
  is_expired: boolean;
  is_prohibited: boolean;
  width: number;
  audit_status: 'audited' | 'no_audit' | 'pending' | 'rejected' | 'unauditable';
  name: string;
  pop_window_maximize: boolean;
  height: number;
  state: State;
  format: 'flash' | 'iframe-html' | 'image' | 'raw-html' | 'raw-js' | 'text' | 'url-html' | 'url-js';
  is_self_audited: boolean;
  id: number;
  code: string;
  weight: number;
  ad_type: AdType;
  all_budget_intervals: boolean;
}

export interface LineItem {
  id: number;
  code?: string;
  name: string;
  advertiser_id: number;
  state: State;
  line_item_type: 'curated' | 'guaranteed_delivery' | 'standard_v1' | 'standard_v2';
  timezone: string;
  ad_types: AdType[];
  revenue_value: number;
  revenue_type: 'cost_plus_cpm' | 'cost_plus_margin' | 'cpm' | 'vcpm';
  goal_type: 'cpa' | 'cpc' | 'ctr' | 'custom';
  last_modified: number;
  click_url: string;
  currency: string;
  require_cookie_for_tracking: boolean;
  profile_id: number;
  member_id: number;
  comments: string;
  remaining_days: number;
  total_days: number;
  advertiser: {
    id: number;
    name: string;
  };
  labels: ('Sales Rep' | 'Trafficker')[];
  pixels: {
    id: number;
    state: State;
    post_click_revenue: number;
    post_view_revenue: number;
    name: string;
    trigger_type: TriggerType;
  }[];
  insertion_orders:  {
    id: number;
    state: State;
    code: string;
    name: string;
    advertiser_id: number;
    start_date: string;
    end_date: string;
    timezone: string;
    last_modified: string;
    currency: string;
    budget_intervals: BudgetInterval[];
  }[];
  goal_pixels: {
    id: number;
    state: State;
    trigger_type: TriggerType;
    post_click_goal_target: number;
    post_view_goal_target: number;
    post_click_goal_threshold: number;
    post_view_goal_threshold: number;
  }[];
  imptrackers: {
    id: number;
    member_id: number;
    advertiser_id: number;
    name: string;
    code: string;
    state: State;
    publisher: {
      id: number;
      name: string;
    };
    tag: {
      id: number;
      name: string;
    }[];
    payment_rule: {
      id: number;
      name: string;
    };
    line_item: {
      id: number;
      name: string;
    };
    last_modified: string;
  }[];
  valuation: {
    min_margin_pct: number;
    goal_threshold: number;
    goal_target: number;
    campaign_group_valuation_strategy: 'prospecting' | 'retargeting';
    min_avg_cpm: number;
    max_avg_cpm: number;
    min_margin_cpm: number;
  };
  creatives: Creative[];
  budget_intervals: BudgetInterval[];
  enable_pacing: boolean;
  lifetime_pacing: boolean;
  lifetime_pacing_pct: number;
  payout_margin: number;
  insertion_order_id: number;
  supply_strategies: {
    rtb: boolean;
    managed: boolean;
    deals: boolean;
    programmatic_guaranteed: boolean;
  };
  creative_distribution_type: 'ctr-optimized' | 'even' | 'weighted';
  prefer_delivery_over_performance: boolean;
  viewability_vendor: 'appnexus';
  partner_fees: {
    id: number;
  }[];
}

export interface LineItemParameters {
  id: number;
  code?: string;
  name: string;
  advertiser_id?: number;
  state?: State;
  line_item_type?: 'curated' | 'guaranteed_delivery' | 'standard_v1' | 'standard_v2';
  timezone?: string;
  ad_types: AdType[];
  revenue_value: number;
  revenue_type?: 'cost_plus_cpm' | 'cost_plus_margin' | 'cpm' | 'vcpm';
  goal_type?: 'cpa' | 'cpc' | 'ctr' | 'custom';
  click_url?: string;
  currency?: string;
  require_cookie_for_tracking?: boolean;
  profile_id?: number;
  member_id?: number;
  comments?: string;
  remaining_days?: number;
  total_days?: number;
  labels?: ('Sales Rep' | 'Trafficker')[];
  pixels?: {
    id: number;
    state: State;
    post_click_revenue: number;
    post_view_revenue: number;
    name: string;
    trigger_type: TriggerType;
  }[];
  insertion_orders?:  {
    id: number;
    state: State;
    code: string;
    name: string;
    advertiser_id: number;
    start_date: string;
    end_date: string;
    timezone: string;
    last_modified: string;
    currency: string;
    budget_intervals: BudgetInterval[];
  }[];
  goal_pixels?: {
    id: number;
    state: State;
    trigger_type: TriggerType;
    post_click_goal_target: number;
    post_view_goal_target: number;
    post_click_goal_threshold: number;
    post_view_goal_threshold: number;
  }[];
  valuation?: {
    min_margin_pct: number;
    goal_threshold: number;
    goal_target: number;
    campaign_group_valuation_strategy: 'prospecting' | 'retargeting';
    min_avg_cpm: number;
    max_avg_cpm: number;
    min_margin_cpm: number;
  };
  creatives?: Creative[];
  budget_intervals?: BudgetInterval[];
  enable_pacing?: boolean;
  lifetime_pacing?: boolean;
  lifetime_pacing_pct?: number;
  payout_margin?: number;
  insertion_order_id?: number;
  supply_strategies?: {
    rtb: boolean;
    managed: boolean;
    deals: boolean;
    programmatic_guaranteed: boolean;
  };
  creative_distribution_type?: 'ctr-optimized' | 'even' | 'weighted';
  prefer_delivery_over_performance?: boolean;
  viewability_vendor?: 'appnexus';
  is_archived?: boolean;
  archived_on?: number;
  partner_fees?: {
    id: number;
  }[];
}

export interface LineItemId {
  id: number;
  advertiserId: number;
}

export interface LineItemCode {
  code: string;
  advertiserCode: string;
}

export type GetLineItemParameters = LineItemCode | {
  advertiserId: number;
} | {
  idList: number[];
};

export type ModifyLineItemParameters = LineItemCode | LineItemId;

export interface LineItemBaseResponse {
  status: string;
  count: number;
  start_element?: number;
  num_elements?: number;
}

export type LineItemGetAllResponse = LineItemBaseResponse & {
  'line-items': LineItem[];
};

export type LineItemResponse = LineItemBaseResponse & {
  'line-item': LineItem;
};