/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';
import { XandrError } from '../errors';
import fetch from 'node-fetch';
import avro from 'avsc';
import fs from 'fs';

const longType = avro.types.LongType.__with({
  fromBuffer: (buf: Buffer) => buf.readBigInt64LE(),
  toBuffer: (n: bigint) => {
    const buf = Buffer.alloc(8);
    buf.writeBigInt64LE(n);
    return buf;
  },
  fromJSON: BigInt,
  toJSON: Number,
  isValid: (n: bigint) => typeof n == 'bigint',
  compare: (n1: bigint, n2: bigint) => { 
    // eslint-disable-next-line @typescript-eslint/no-extra-parens
    return n1 === n2 ? 0 : (n1 < n2 ? -1 : 1);
  }
});


import schema from '../../assets/avro/bss.json';

import type {
  BSSDataRow,
  BSSUploadRequestResponse,
  BSSJobStatusResponse,
  BSSJobStatus
} from './types';

export class XandrBSSClient {
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

    const jobs: string[] = [];
    const tempFile = 'upload.avro';
    let processed = 0;
    const encoder = avro.Type.forSchema(schema as avro.Schema, {
      registry: {
        'long': longType
      }
    });

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

      const writer = avro.createFileEncoder(tempFile, encoder, { codec: 'deflate' });
      chunk.map(row => writer.write(row));
      writer.end();

      await new Promise(resolve => writer.on('end', resolve));

      const up = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'octet-stream', Authorization: this.client.getToken() ?? '' },
        body: await fs.promises.readFile(tempFile)
      });

      if (up.status > 299) {
        throw new XandrError(await up.text(), '', up.status, Object.fromEntries(up.headers.entries()));
      }

      await fs.promises.unlink(tempFile);
    }

    return jobs;
  }
}