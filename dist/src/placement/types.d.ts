declare type State = 'active' | 'inactive';
declare type Position = 'above' | 'below' | 'unknown';
interface Creative {
    id: number;
    width: number;
    height: number;
    price: number;
    name: string;
}
interface Category {
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
    type: 'deal_priority' | 'deal' | 'standard';
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
export interface Placement {
    id: number;
    name: string;
    code: string | null;
    code2: string | null;
    code3: string | null;
    state: State;
    width: number;
    height: number;
    is_resizable: boolean;
    default_position: Position;
    publisher_id: number;
    publisher_name: string;
    site_id: number;
    site_name: string;
    inventory_source_id: number | null;
    ad_profile_id: number | null;
    supported_media_types: {
        id: number;
        name: string;
    }[] | null;
    supported_media_subtypes: {
        id: number;
        name: string;
    }[] | null;
    default_creative_id: number | null;
    default_creatives: Creative[] | null;
    reserve_price: number | null;
    hide_referer: boolean;
    default_referrer_url: string | null;
    visibility_profile_id: number;
    exclusive: boolean;
    pixel_url: string | null;
    pixel_type: 'image' | 'javascript';
    content_categories: Category[] | null;
    filtered_advertisers: {
        id: number;
        name: string;
    }[] | null;
    filtered_line_items: {
        id: number;
        name: string;
    }[] | null;
    filtered_campaigns: {
        id: number;
        name: string;
    }[] | null;
    segments: {
        id: number;
        name: string;
    }[] | null;
    estimated_clear_prices: {
        clear_price: number;
        average_price: number;
        width: number;
        height: number;
        verified: boolean;
    }[];
    intended_audience: 'children' | 'general' | 'mature' | 'young_adult' | null;
    inventory_attributes: {
        id: number;
        name: string;
    }[] | null;
    audited: boolean;
    audit_level: 'placement' | 'site';
    default_calculcation_type: 'gross' | 'net';
    demand_filter_action: string;
    floor_application_target: 'all' | 'external_non_preferred' | 'external_only';
    pixel_url_secure: string | null;
    site_audit_status: 'self' | 'unaudited';
    is_prohibited: boolean;
    last_modified: string;
    cost_cpm: number | null;
    content_retrieval_timeout_ms: number;
    enable_for_mediation: boolean;
    private_sizes: {
        width: number;
        height: number;
    }[] | null;
    video: VideoSettings | null;
    ad_types: {
        id: number;
        name: string;
    };
    use_detected_domain: boolean;
    mime_types: string[];
    supported_mime_types_action_include: boolean;
    handles_mixed_media: boolean;
    tinytag_renderer_asset_floor_prices: {
        renderer_id: number;
        ad_type_id: number;
        asset_type: number;
        floor_price: number;
    }[];
}
export interface PlacementInput {
    name?: string;
    code?: string;
    code2?: string;
    code3?: string;
    state?: State;
    width?: number;
    height?: number;
    is_resizable?: boolean;
    default_position?: Position;
    publisher_id: number;
    site_id?: number;
    ad_profile_id?: number;
    supported_media_types?: {
        id: number;
        name: string;
    }[] | null;
    supported_media_subtypes?: {
        id: number;
        name: string;
    }[] | null;
    default_creatives?: Creative[];
    reserve_price?: number;
    hide_referer?: boolean;
    default_referrer_url?: string;
    visibility_profile_id?: number;
    pixel_url?: string;
    pixel_type?: 'image' | 'javascript';
    content_categories?: Category[];
    filtered_advertisers?: {
        id: number;
        name: string;
    }[];
    filtered_line_items?: {
        id: number;
        name: string;
    }[];
    filtered_campaigns?: {
        id: number;
        name: string;
    }[];
    segments?: {
        id: number;
        name: string;
    }[];
    intended_audience?: 'children' | 'general' | 'mature' | 'young_adult';
    inventory_attributes?: {
        id: number;
        name: string;
    }[];
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
    ad_types: {
        id: number;
        name: string;
    };
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
export declare type GetPlacementParams = {
    placementIds: number[];
} | {
    publisherId: number;
};
export declare type PostPlacementParams = {
    publisherId: number;
} | {
    siteId: number;
};
export declare type PutPlacementParams = {
    placementId: number;
} & ({
    publisherId: number;
} | {
    siteId: number;
});
export interface PlacementResponse {
    status: string;
    count: number;
    start_element: number;
    num_elements: number;
    placement: Placement;
    placements: Placement[];
}
export {};
