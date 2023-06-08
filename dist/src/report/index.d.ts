/// <reference types="node" />
import type { XandrClient } from '..';
import type { CreateReportParameters, GetReportStatusResponse } from './types';
export declare class XandrReportClient {
    private readonly client;
    private readonly endpoint;
    private readonly endpointDownload;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    create(params: CreateReportParameters): Promise<string>;
    getStatus(id: string): Promise<GetReportStatusResponse>;
    download(id: string): Promise<NodeJS.ReadableStream>;
}
