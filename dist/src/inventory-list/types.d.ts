import type { CommonResponse } from '../xandr-types';
export type AuditStatus = 'audited' | 'is_adserver' | 'masked' | 'pending' | 'rejected' | 'unauditable' | 'unaudited';
export interface InventoryList {
    id: number;
    advertiser_id: number;
    created_on: string;
    description: string;
    name: string;
    insertion_order_id: number;
    inventory_list_type: 'allowlist' | 'blocklist';
    inventory_url_list_id: number;
    last_modified: string;
    line_item_id: number;
    num_apps: number;
    num_domains: number;
    required_for_all: boolean;
}
export interface InventoryListItem {
    id: number;
    app_name: string;
    audit_status: AuditStatus;
    is_supported: boolean;
    inventory_url: string;
    include_children: boolean;
    rejection_reason: string;
}
export interface InventoryListPostParameters {
    advertiser_id?: number;
    description?: string;
    name: string;
    insertion_order_id?: number;
    inventory_list_type: 'allowlist' | 'blocklist';
    line_item_id?: number;
    required_for_all?: boolean;
}
export interface InventoryListItemPostParameters {
    app_name?: string;
    include_children?: boolean;
    url: string;
}
export interface InventoryListPutParameters {
    description?: string;
    name?: string;
    advertiser_id?: number;
    required_for_all?: boolean;
}
export interface InventoryListItemPutParameters {
    include_children?: boolean;
}
export type InventoryListResponse = CommonResponse & {
    'inventory-list': InventoryList;
};
export type InventoryListsResponse = CommonResponse & {
    'inventory-lists': InventoryList[];
};
export type InventoryListItemResponse = CommonResponse & {
    'inventory-list-item': InventoryListItem;
};
export type InventoryListItemsResponse = CommonResponse & {
    'inventory-list-items': InventoryListItem[];
};
