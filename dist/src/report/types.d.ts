declare type ReportType = 'advertiser_analytics' | 'advertiser_frequency_recency' | 'attributed_conversions' | 'buyer_invoice_report' | 'buyer_segment_performance' | 'clicktrackers' | 'inventory_daily_uniques' | 'inventory_domain_analytics' | 'inventory_source_analytics' | 'key_value_analytics' | 'network_advertiser_analytics' | 'network_advertiser_frequency_recency' | 'network_analytics_feed' | 'network_analytics_provisional' | 'network_analytics' | 'network_billing' | 'network_creative_search' | 'network_publisher_analytics' | 'network_site_domain_performance' | 'pixel_fired' | 'prebid_server_analytics' | 'psp_health_analytics' | 'publisher_analytics' | 'publisher_brand_review' | 'publisher_creative_search' | 'segment_load' | 'seller_brand_review' | 'seller_invoice_report' | 'seller_site_domain' | 'site_domain_performance' | 'video_analytics_network_advertiser' | 'video_analytics_network_publisher' | 'video_analytics_network';
declare type ReportInterval = 'current_hour' | 'last_hour' | 'today' | 'yesterday' | 'last_48_hours' | 'last_2_days' | 'last_7_days' | 'last_14_days' | 'month_to_yesterday' | 'month_to_date' | 'quarter_to_date' | 'last_month' | 'lifetime' | '30_days';
declare type Format = 'csv' | 'excel' | 'html';
declare type ReportingDecimalType = 'comma' | 'decimal';
export interface CreateReportParameters {
    report_type: ReportType;
    timezone?: string;
    filters?: Record<string, unknown>[];
    group_filters?: Record<string, unknown>[];
    columns: string[];
    start_date?: string;
    end_date?: string;
    report_interval?: ReportInterval;
    orders?: Record<string, unknown>[];
    format?: Format;
    reporting_decimal_type?: ReportingDecimalType;
    emails?: string[];
    escape_fields?: boolean;
}
export interface CreateReportResponse {
    status: string;
    report_id: string;
}
export interface GetReportStatusResponse {
    status: string;
    report: {
        name: string | null;
        create_on: string;
        cache_hit: boolean;
        fact_cache_hit: boolean;
        json_request: string;
        header_info: string;
        report_size: string;
        row_count: string;
        url: string;
    };
    execution_status: string;
}
export {};
