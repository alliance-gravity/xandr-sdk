/// <reference types="node" />
import type { CommonResponse } from '../xandr-types';
export type BSSUploadRequestResponse = CommonResponse & {
    batch_segment_upload_job: {
        job_id: string;
        id: number;
        member_id: number;
        last_modified: string;
        upload_url: string;
    };
    id: number;
};
export interface BSSJobStatus {
    phase: string;
    start_time: string;
    uploaded_time: string;
    validated_time: string;
    completed_time: string;
    error_code: number | null;
    time_to_process: string;
    percent_complete: number;
    num_valid: number;
    num_valid_user: number;
    num_invalid_format: number;
    num_invalid_user: number;
    num_invalid_segment: number;
    num_unauth_segment: number;
    num_past_expiration: number;
    num_inactive_segment: number;
    num_other_error: number;
    error_log_lines: string;
    segment_log_lines: string;
    id: number;
    job_id: string;
    member_id: number;
    created_on: string;
    last_modified: string;
}
export type BSSJobStatusResponse = CommonResponse & {
    batch_segment_upload_job: BSSJobStatus;
};
type DeviceIdDomain = 'aaid' | 'idfa' | 'md5udid' | 'openudid' | 'rida' | 'sha1udid' | 'windowsadid';
export interface BSSDataRow {
    uid: {
        aes_encrypted: {
            ciphertext: Buffer;
            iv: Buffer;
            key_id: number;
            set_name: DeviceIdDomain | null;
        };
    } | {
        device_id: {
            id: string;
            domain: DeviceIdDomain;
        };
    } | {
        eid: {
            id: string;
            source: string;
        };
    } | {
        external_id: {
            id: string;
            member_id: number;
        };
    } | {
        hem: {
            hex_encoded: string;
        };
    } | {
        ifa: {
            id: string;
            type: string;
        };
    } | {
        long: bigint;
    } | {
        xfa: {
            device_model_id?: number;
            device_make_id?: number;
            ip?: string;
        };
    };
    segments: {
        id: number;
        code: string;
        member_id: number;
        expiration: number;
        timestamp: bigint;
        value: number;
    }[];
}
export {};
