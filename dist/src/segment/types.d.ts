type State = 'active' | 'inactive';
type pixelType = 'image' | 'js';
type valueType = 'none' | 'numeric' | 'text';
export interface SegmentResponse {
    status: string;
    count: number;
    id: string;
    start_element: number;
    num_elements: number;
    segment: Segment;
}
export interface SegmentsResponse {
    status: string;
    count: number;
    id: string;
    start_element: number;
    num_elements: number;
    segments: Segment[];
}
export interface Segment {
    id: number;
    code: string;
    state: State;
    short_name: string;
    description: string;
    member_id: string;
    category: string;
    expire_minutes: number;
    enable_rm_piggyback: boolean;
    max_usersync_pixels: number;
    last_modified: string;
    provider_id: number;
    advertiser_id: number;
    piggyback_pixels: {
        url: string;
        pixel_type: pixelType;
    }[];
    price: number;
    parent_segment_id: number;
}
export interface SegmentParameters {
    code?: string;
    state?: State;
    short_name?: string;
    description?: string;
    member_id?: string;
    category?: string;
    expire_minutes?: number;
    enable_rm_piggyback?: boolean;
    max_usersync_pixels?: number;
    provider_id?: number;
    advertiser_id?: number;
    piggyback_pixels?: {
        url: string;
        pixel_type: pixelType;
    }[];
    price?: number;
    parent_segment_id?: number;
    querystring_mapping?: {
        param: string;
        value_type: valueType;
        values: string[];
        allow_empty_text: boolean;
        publishers: {
            id: string;
        }[];
        sites: {
            id: string;
        }[];
        placements: {
            id: string;
        }[];
        include_shared: boolean;
    };
    querystring_mapping_key_value?: {
        qs_key: string;
        qs_value: string;
    };
}
export type Advertiser = {
    adverstiserCode: string;
} | {
    advertiserId: number;
};
export type SegmentReference = {
    code: string;
} | {
    id: number;
};
export type AdvertiserSegmentReference = {
    segmentCode: string;
    advertiserCode: string;
} | {
    segmentId: number;
    advertiserId: number;
};
export {};
