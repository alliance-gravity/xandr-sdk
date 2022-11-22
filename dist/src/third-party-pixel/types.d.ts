import type { Id, AuditStatus } from '../xandr-types';
export interface ThirdPartyPixelInput {
    active?: boolean;
    adservers?: Id[] | null;
    advertisers?: Id[] | null;
    advertiser_id?: number | null;
    audit_status: AuditStatus;
    content: string;
    format: string;
    members?: Id[] | null;
    member_id: number;
    name: string | null;
    secure_content?: string | null;
    secure_url?: string | null;
    supply_exceptions?: {
        name: string;
    }[] | null;
    url?: string | null;
}
export declare type ThirdPartyPixel = Required<ThirdPartyPixelInput> & {
    id: number;
    creatives: Id[] | null;
};
