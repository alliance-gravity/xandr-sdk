/* eslint-disable @typescript-eslint/naming-convention */

import type { XandrClient } from '..';
import type {
  CreateReportParameters,
  CreateReportResponse,
  GetReportStatusResponse
} from './types';

export class XandrReportClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'report';

  private readonly endpointDownload = 'report-download';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async create (params: CreateReportParameters): Promise<string> {
    const response = await this.client.execute<CreateReportResponse>({
      method: 'POST',
      endpoint: this.endpoint,
      headers: this.defaultHeaders,
      body: { report: params }
    });
    return response.report_id;
  }

  public async getStatus (id: string): Promise<GetReportStatusResponse> {
    const response = await this.client.execute<GetReportStatusResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      query: { id }
    });
    return response;
  }

  public async download (id: string): Promise<NodeJS.ReadableStream> {
    const stream = await this.client.executeStream({
      method: 'GET',
      endpoint: this.endpointDownload,
      query: { id }
    });
    return stream;
  }

}