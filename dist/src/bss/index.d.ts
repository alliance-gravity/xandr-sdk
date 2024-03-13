import type { XandrClient } from '..';
import type { BSSDataRow, BSSJobStatus } from './types';
export declare class XandrBSSClient {
    private readonly client;
    private readonly endpoint;
    constructor(client: XandrClient);
    getStatus(memberId: number, jobId: string): Promise<BSSJobStatus>;
    upload(memberId: number, rows: BSSDataRow[], chunkSize?: number): Promise<string[]>;
}
