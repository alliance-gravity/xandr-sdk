import type { CommonResponse, Id, State } from '../xandr-types';
export declare type SiteSupplyType = 'facebook_sidebar' | 'mobile_app' | 'mobile_web' | 'web';
export declare type SiteIntendedAudience = 'children' | 'general' | 'mature' | 'young_adult';
export declare type SiteCreativeFormatAction = 'exclude' | 'include';
interface SiteContentCategory {
    id: number;
    is_system?: boolean;
    name?: string;
    primary?: boolean;
}
interface SiteInventoryAttribute {
    id?: number;
    inventory_attribute_id?: number;
    name?: string;
}
interface SitePlacement {
    id: number;
    code?: string;
}
interface SiteMarketplaceMap {
    an_audit_perf_only?: boolean;
    rtb?: boolean;
    performance?: boolean;
    deals_allowed?: boolean;
    rtb_suspended?: boolean;
    deals_suspended?: boolean;
}
interface SiteMobileAppInstance {
    id?: number;
    bundle_id?: string;
    os_family_id?: number;
}
export interface Site {
    id: number;
    code: string | null;
    name: string;
    state: State;
    url: string;
    publisher_id: number;
    primary_content_category_id: number | null;
    last_modified: string;
    placements: SitePlacement[] | null;
    content_categories: SiteContentCategory[] | null;
    intended_audience: SiteIntendedAudience | null;
    inventory_attributes: SiteInventoryAttribute[] | null;
    audited: boolean;
    publisher_name: string;
    supply_type: SiteSupplyType;
    creative_format_action: SiteCreativeFormatAction;
    creative_formats: string[];
    allowed_click_actions: string[];
    marketplace_map: SiteMarketplaceMap;
    mobile_app_instance: SiteMobileAppInstance | null;
    mobile_app_instance_id: number | null;
}
export interface PostSiteParameters {
    code?: string;
    name: string;
    state?: State;
    url?: string;
    primary_content_category_id?: number;
    content_categories?: SiteContentCategory[];
    intended_audience?: SiteIntendedAudience;
    inventory_attributes?: SiteInventoryAttribute[];
    supply_type?: SiteSupplyType;
    creative_format_action?: SiteCreativeFormatAction;
    creative_formats?: string[];
    allowed_click_actions?: string[];
    marketplace_map?: SiteMarketplaceMap;
    mobile_app_instance?: SiteMobileAppInstance;
}
export interface PutSiteParameters {
    code?: string;
    name?: string;
    state?: State;
    url?: string;
    primary_content_category_id?: number;
    content_categories?: SiteContentCategory[];
    intended_audience?: SiteIntendedAudience;
    inventory_attributes?: SiteInventoryAttribute[];
    supply_type?: SiteSupplyType;
    creative_format_action?: SiteCreativeFormatAction;
    creative_formats?: string[];
    allowed_click_actions?: string[];
    marketplace_map?: SiteMarketplaceMap;
    mobile_app_instance?: SiteMobileAppInstance;
}
export declare type GetSiteParameters = {
    id: number;
    publisherId?: number;
} | {
    idList: number[];
} | {
    publisherId: number;
};
export interface ModifySiteParameters {
    id: number;
    publisherId?: number;
}
export declare type SiteBaseResponse = CommonResponse & Id;
export declare type SiteResponse = SiteBaseResponse & {
    sites?: Site[];
    site?: Site;
};
export {};
