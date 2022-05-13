export interface MappingRecordsResponse {
    status: string;
    count: number;
    id: string;
    start_element: number;
    num_elements: number;
    segment_billing_categories: MappingRecord[];
}
export interface PricingTaxonomy {
    id: number;
    node_name: string;
    level_index: number;
    data_publisher_id: number;
    data_provider_id: number;
    active: boolean;
    member_id: number;
}
export interface PricingTaxonomyResponse {
    'data-providers': {
        id: number;
        node_name: string;
        member_id: number;
        data_revshare_pct: number;
        active: boolean;
        data_publishers: {
            id: number;
            node_name: string;
            level_index: number;
            data_provider_id: number;
            active: boolean;
            member_id: number;
            data_categories: PricingTaxonomy[];
        }[];
    }[];
}
export interface MappingRecord {
    id: number;
    segment_id: number;
    data_provider_id: number;
    data_category_id: number;
    active: boolean;
    member_id: number;
    is_public: boolean;
    data_segment_type_id: string;
    recommend_include: boolean;
}
export interface PostMappingRecordParameters {
    segment_id: number;
    data_provider_id: number;
    data_category_id: number;
    active: boolean;
    is_public?: boolean;
    data_segment_type_id?: string;
    recommend_include?: boolean;
}
export interface PutMappingRecordParameters {
    id: number;
    segment_id: number;
    data_provider_id: number;
    data_category_id: number;
    active?: boolean;
    is_public?: boolean;
    data_segment_type_id?: string;
    recommend_include?: boolean;
}
