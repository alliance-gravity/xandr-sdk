import type { LineItem } from '../line-item/types';
import type { CommonResponse, Id } from '../xandr-types';
interface Labels {
    value: string;
    id: number;
    name: 'Campaign Type' | 'Sales Rep' | 'Trafficker';
}
interface BrokerFee {
    broker_id?: number;
    payment_type?: 'cpm' | 'revshare';
    value?: number;
    description?: string;
}
interface BudgetInterval {
    id?: number;
    start_date: string;
    end_date: string;
    timezone: string;
    code?: string;
    lifetime_budget: number;
    lifetime_budget_imps?: number;
    lifetime_pacing?: boolean;
    daily_budget?: number;
    daily_budget_imps?: number;
    enable_pacing?: boolean;
    lifetime_pacing_pct?: number;
}
interface PoliticalContent {
    billing_name?: string;
    billing_address_1: string;
    billing_address_2?: string;
    billing_city: string;
    billing_region: string;
    billing_postal_code: string;
    billing_country: string;
    billing_phone_code: string;
    billing_phone: string;
    us_fecid?: string;
    organization_name: string;
    organization_address_1: string;
    organization_address_2?: string;
    organization_city: string;
    organization_region: string;
    organization_postal_code: string;
    organization_country: string;
    organization_phone_code: string;
    organization_phone: string;
    treasurer_name: string;
    payment_method_type: 'Check' | 'Credit Card' | 'Direct Debit' | 'Other';
    political_objective: string;
    payment_method_other?: string;
    is_independent_expenditure_committee: boolean;
    is_ineligible?: boolean;
    government_level?: 'both' | 'federal' | 'state or local';
    is_accuracy_acknowledged: boolean;
}
export interface InsertionOrder {
    id: number;
    name: string;
    code: string;
    state: 'active' | 'inactive';
    advertiser_id: number;
    start_date: string | null;
    end_date: string | null;
    remaining_days: number;
    total_days: number;
    last_modified: string;
    timezone: string;
    currency: string;
    comments: string;
    billing_code: string | null;
    line_item: LineItem[] | null;
    labels: Labels[] | null;
    broker_fees: BrokerFee[] | null;
    budget_intervals: BudgetInterval[];
    budget_type: 'flexible' | 'impression' | 'revenue';
    profile_id: number;
    viewability_standard_provider: string;
    is_running_political_ads: boolean;
    political_content: PoliticalContent;
}
export interface InsertionOrderParameters {
    id?: number;
    name: string;
    code?: string;
    state: 'active' | 'inactive';
    advertiser_id?: number;
    start_date?: string;
    end_date?: string;
    remaining_days?: number;
    total_days?: number;
    last_modified?: string;
    timezone?: string;
    currency?: string;
    comments?: string;
    billing_code?: string;
    line_item?: LineItem[];
    labels?: Labels[];
    broker_fees?: BrokerFee[];
    budget_intervals?: BudgetInterval[];
    budget_type: 'flexible' | 'impression' | 'revenue';
    profile_id?: number;
    viewability_standard_provider?: string;
    is_running_political_ads?: boolean;
    political_content?: PoliticalContent;
}
export declare type GetInsertionOrderParameters = {
    advertiserId: number;
} | {
    id: number;
} | {
    idList: number[];
};
export interface ModifyInsertionOrderParameters {
    id: number;
    advertiserId: number;
}
export declare type InsertionOrderBaseResponse = CommonResponse & Id;
export declare type InsertionOrderResponse = InsertionOrderBaseResponse & {
    'insertion-orders'?: InsertionOrder[];
    'insertion-order'?: InsertionOrder;
};
export {};
