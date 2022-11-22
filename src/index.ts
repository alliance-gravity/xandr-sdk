import type { AuthParameters, RequestParameters } from './types';
import { auth, request, sleep } from './utils';
import { XandrCustomModelClient } from './custom-model';
import { XandrAPDClient } from './apd';
import { XandrLineItemClient } from './line-item';
import { XandrError } from './errors';
import { XandrSegmentClient } from './segment';
import { XandrSegmentBillingCategoryClient } from './segment-billing-category';
import { XandrPlacementClient } from './placement';
import { XandrAdvertiserClient } from './advertiser';
import { XandrPublisherClient } from './publisher';

export const defaultApiUrl = 'https://api.appnexus.com';
export { sanitizeUrlFormat } from './apd/utils';
export { XandrError };

export class XandrClient {
  public customModel: XandrCustomModelClient = new XandrCustomModelClient(this);

  public advertiser: XandrAdvertiserClient = new XandrAdvertiserClient(this);

  public publisher: XandrPublisherClient = new XandrPublisherClient(this);

  public apd: XandrAPDClient = new XandrAPDClient(this);

  public lineItem: XandrLineItemClient = new XandrLineItemClient(this);

  public segment: XandrSegmentClient = new XandrSegmentClient(this);

  public segmentBillingCategory: XandrSegmentBillingCategoryClient = new XandrSegmentBillingCategoryClient(this);

  public placement: XandrPlacementClient = new XandrPlacementClient(this);

  private readonly creds: AuthParameters;

  private readonly apiUrl: string;

  private token: string | null = null;

  public constructor (params: AuthParameters, apiUrl: string = defaultApiUrl) {
    this.creds = params;
    this.apiUrl = apiUrl;
  }

  public getToken (): string | null {
    return this.token;
  }

  public async execute<ExpectedResponseType>(params: RequestParameters): Promise<ExpectedResponseType> {
    if (this.token === null)
      await this.authenticate();
    try {
      if (!params.headers)
        params.headers = {};
      params.headers.Authorization = this.token ?? '';
      const resp = await request<ExpectedResponseType>(params, this.apiUrl);
      return resp;
    } catch (error: unknown) {
      if (error instanceof XandrError) {
        if (error.code === 'NOAUTH') {
          await this.authenticate();
          const resp = await this.execute<ExpectedResponseType>(params);
          return resp;
        }
        if (error.status === 429) {
          const secs = error.headers['Retry-After'] || error.headers['retry-after'];
          await sleep(secs ? Number(secs) * 1000 : 0);
          const resp =  await this.execute<ExpectedResponseType>(params);
          return resp;
        }
      }
      throw error;
    }
  }

  private async authenticate (): Promise<void> {
    this.token = await auth(this.creds, this.apiUrl);
  }
}