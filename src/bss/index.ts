/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';
import * as avro from 'avsc';

import schema from '../../assets/avro/bss.json';

import type {
  BSSDataRow,
  BSSUploadRequestResponse,
  BSSJobStatusResponse,
  BSSJobStatus
} from './types';

export class XandrInsertionBSS {
  private readonly client: XandrClient;

  private readonly endpoint: string = 'batch-segment';

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async getStatus (memberId: number, jobId: string): Promise<BSSJobStatus> {
    const response = await this.client.execute<BSSJobStatusResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      query: { member_id: memberId, job_id: jobId }
    });
    return response.batch_segment_upload_job;
  }

  public async upload (memberId: number, rows: BSSDataRow[], chunkSize = 1000000): Promise<string[]> {

    const jobs = [];
    let processed = 0;
    const encoder = avro.Type.forSchema(schema as avro.Schema);

    while (processed < rows.length) {

      const chunk = rows.slice(processed, processed + chunkSize);
      processed += chunkSize;

      const response = await this.client.execute<BSSUploadRequestResponse>({
        method: 'POST',
        endpoint: this.endpoint,
        query: { member_id: memberId }
      });

      jobs.push(response.batch_segment_upload_job.job_id);
      const url = response.batch_segment_upload_job.upload_url;


      // Use `encoder` to process rows from `chunk` to POST to `url`
    }

    return jobs;

  }
}