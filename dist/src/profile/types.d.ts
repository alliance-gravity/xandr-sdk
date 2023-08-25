import type { Placement } from '../placement/types';
import type { CommonResponse, Id } from '../xandr-types';
declare type Action = 'exclude' | 'include';
interface DaypartTarget {
    day: 'all' | 'friday' | 'monday' | 'saturday' | 'sunday' | 'thursday' | 'tuesday' | 'wednesday';
    start_hour: number;
    end_hour: number;
}
interface SegmentTarget {
    id: number;
    code: string;
    action: Action;
    start_minutes: number;
    expire_minutes: number;
    other_equals: number | null;
    other_less: number | null;
    other_greater: number | null;
    other_in_list: string[] | null;
}
interface SegmentGroupTarget {
    boolean_operator: 'and' | 'or';
    id: number;
    code: string;
    action: Action;
    start_minutes: number;
    expire_minutes: number;
    other_equals: number | null;
    other_less: number | null;
    other_greater: number | null;
    other_in_list: string[] | null;
}
interface Targeting {
    graph_id: number;
    daypart_timezone: string;
    daypart_targets?: DaypartTarget[];
    segment_targets?: SegmentTarget[];
    segment_group_targets?: SegmentGroupTarget[];
    segment_boolean_operator: 'and' | 'or';
    age_targets?: {
        allow_unknown: boolean;
        ages: {
            low: number;
            high: number;
        }[];
    };
    gender_targets?: {
        gender: 'f' | 'm';
        allow_unknown: boolean;
    };
    country_targets?: {
        id: number;
        name?: string;
        code?: string;
    }[];
    country_action: Action;
    region_targets?: {
        id: number;
        name?: string;
        code?: string;
        country_name?: string;
        country_code?: string;
    }[];
    require_transparency_and_consent_framework_string: boolean;
    region_action: Action;
    dma_targets?: {
        dma: number;
    }[];
    dma_action: Action;
    city_targets?: {
        id: number;
        name: string;
        region_name: string;
        region_code: string;
        country_code: string;
        country_name: string;
    }[];
    city_action: Action;
    domain_targets?: {
        profile_id: number;
        domain: string;
    }[];
    domain_action: Action;
    domain_list_targets?: {
        id: number;
        name: string;
        description: string;
        type: string;
        delete: boolean;
    }[];
    domain_list_action: Action;
    platform_placement_targets?: Placement[];
    size_target?: {
        width: number;
        height: number;
    }[];
    seller_member_group_targets?: {
        id: number;
        action_include: boolean;
    }[];
    member_targets?: {
        id: number;
        action: Action;
        third_party_auditor_id: number | null;
        billing_name: string;
    }[];
    video_targets?: {
        allow_unknown_playback_method: boolean;
        allow_unknown_context: boolean;
        allow_unknown_player_size: boolean;
    }[];
    engagement_rate_targets?: {
        engagement_rate_type: '1: video_completion' | '2: view' | '3: view_over_total' | '4: predicted_iab_video_view_rate' | '5: predicted_iab_video_view_rate_over_total' | '6: predicted_100pv50pd_video_view_rate' | '7: predicted_100pv50pd_video_view_rate_over_total' | '8: predicted_100pv1s_display_view_rate' | '9: predicted_100pv1s_display_view_rate_over_total';
        engagement_rate_pct: number;
    }[];
    publisher_targets?: {
        id: number;
        action: Action;
        name: string;
        deleted: boolean;
    }[];
    site_targets?: {
        id: number;
    }[];
    placement_targets?: {
        id: number;
    }[];
    inventory_action: Action;
    content_category_targets?: {
        id: number;
        action: Action;
    }[];
    deal_targets?: {
        id: number;
        name: string;
        code: string;
    }[];
    deal_list_targets?: {
        id: number;
    }[];
    platform_publisher_targets?: {
        id: number;
        action: Action;
        name: string;
        deleted: boolean;
    }[];
    platform_content_category_targets?: {
        id: number;
        action: Action;
    }[];
    use_inventory_attribute_targets: boolean;
    trust: 'appnexus' | 'seller';
    allow_unaudited: boolean;
    session_freq_type: 'platform' | 'publisher';
    inventory_attribute_targets?: {
        id: number;
        name: string;
        deleted: boolean;
    }[];
    intended_audience_targets?: string[];
    language_targets?: {
        id: number;
        name: string;
        code: string;
        delete: boolean;
    }[];
    querystring_targets?: {
        value: string;
    }[];
    querystring_action: Action;
    querystring_boolean_operator: 'and' | 'or';
    postal_code_targets?: {
        id: number;
    }[];
    postal_code_list_targets?: {
        id: number;
    }[];
    postal_code_action_include: boolean;
    supply_type_targets?: string[];
    supply_type_action?: 'mobile_app' | 'mobile_web' | 'web';
    user_group_targets?: {
        include_cookieless_users: boolean;
        groups: {
            low: number;
            high: number;
        }[];
    }[];
    position_targets?: {
        allow_unknown: boolean;
        positions: {
            position: 'above' | 'below';
        };
    };
    browser_targets?: {
        id: number;
        name: string;
        deleted: boolean;
    }[];
    browser_action?: Action;
    location_target_latitude?: number;
    location_target_longitude?: number;
    location_target_radius?: number;
    device_model_targets?: {
        id: number;
        name: string;
    }[];
    device_model_action?: Action;
    device_type_targets?: string[];
    device_type_action?: Action;
    carrier_targets?: {
        id: number;
        name: string;
        country: string;
    }[];
    carrier_action?: Action;
    inventory_url_list_targets?: {
        deleted: boolean;
        id: number;
        list_type: string;
        name: string;
        exclude: boolean;
    }[];
    operating_system_family_targets?: {
        id: number;
        name: string;
        action: Action;
    }[];
    operating_system_family_action?: Action;
    use_operating_system_extended_targeting?: boolean;
    operating_system_extended_targets?: {
        id: number;
        name: string;
        action: Action;
    }[];
    operating_system_action?: Action;
    mobile_app_instance_targets?: {
        id: number;
        bundle_id: string;
        os_family_id: number;
    }[];
    mobile_app_instance_action_include?: boolean;
    mobile_app_instance_list_targets?: {
        id: number;
        bundle_id: string;
        os_family_id: number;
    }[];
    mobile_app_instance_list_action_include?: boolean;
    deal_action_include?: boolean;
    ip_range_list_targets?: {
        id: number;
        name: string;
        include: boolean;
        description: string;
    }[];
    key_value_targets?: {
        kv_expression: {
            header: {
                an_version: string;
                client_version: string;
            };
            exp: {
                typ: string;
                sbe: {
                    typ: string;
                    key: string;
                    vtp: number[] | string[] | number | string;
                    vst: string;
                };
            };
            key: string;
            vtp: number[] | string[] | number | string;
            vnm: number;
            vst: string;
            vna: number[];
            vsa: string[];
        };
    }[];
    ad_slot_position_action_include?: boolean;
    ad_slot_position_targets?: number[];
    ad_slot_intro_bumper_action_include?: boolean;
    ad_slot_outro_bumper_action_include: boolean;
    created_on?: string;
    is_expired: boolean;
    inventory_url_whitelist_settings?: {
        apply_to_managed: boolean;
        apply_to_rtb: boolean;
    };
    ads_txt_authorized_only: boolean;
    political_district_targets?: {
        id: number;
    }[];
}
interface Profile {
    id: number;
    code: string;
    description: string;
    is_template: boolean;
    last_modified: string;
    is_archived: boolean;
    archived_on: string;
}
export interface ProfileGeographyParameter {
    profile: {
        country_targets?: {
            id: number;
            name?: string;
            code?: string;
        }[];
        country_action: Action;
        region_targets?: {
            id: number;
            name?: string;
            code?: string;
            country_name?: string;
            country_code?: string;
        }[];
        require_transparency_and_consent_framework_string: boolean;
        region_action: Action;
        city_targets?: {
            id: number;
            name: string;
            region_name: string;
            region_code: string;
            country_code: string;
            country_name: string;
        }[];
        city_action: Action;
    };
}
export declare type ProfileBaseResponse = CommonResponse & Id;
interface ProfileId {
    id?: number;
    advertiser_id: number;
    member_id: number;
}
interface ProfileCode {
    profile_code?: string;
    advertiser_code: string;
}
export declare type AddProfileParameters = {
    advertiser_code: string;
} | {
    advertiser_id: number;
    member_id: number;
};
export declare type GetProfileParameters = ProfileCode | ProfileId;
export declare type ModifyProfileParameters = ProfileCode | ProfileId;
export declare type ProfileFull = Profile & Targeting;
export declare type ProfileGetResponse = ProfileBaseResponse & {
    'profiles'?: ProfileFull[];
    'profile'?: ProfileFull;
};
export declare type ProfileResponse = ProfileBaseResponse & {
    'profile': ProfileFull;
};
export {};
