export declare type State = 'active' | 'inactive';
export declare type AdType = 'audio' | 'banner' | 'native' | 'video';
export declare type TriggerType = 'click' | 'hybrid' | 'view';
export declare type TimeFormat = '12-hour' | '24-hour';
export declare type AuditStatus = 'approved' | 'exempt' | 'pending' | 'rejected';
export declare type PlacementPosition = 'above' | 'below' | 'unknown';
export interface ReadOnlyAttributes {
    last_modified: string;
}
export interface CommonResponse {
    status: string;
    count: number;
    start_element: number;
    num_elements: number;
}
export interface Id {
    id: number;
}
export interface IdName {
    id: number;
    name: string;
}
export interface IdNameValue {
    id: number;
    name: string;
    value: string;
}
