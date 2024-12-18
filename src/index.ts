import type { AuthParameters, RequestParameters } from './types';
import { auth, request, requestStream, sleep } from './utils';
import { XandrCustomModelClient } from './custom-model';
import { XandrAPDClient } from './apd';
import { XandrLineItemClient } from './line-item';
import { XandrError } from './errors';
import { XandrSegmentClient } from './segment';
import { XandrSegmentBillingCategoryClient } from './segment-billing-category';
import { XandrPlacementClient } from './placement';
import { XandrAdvertiserClient } from './advertiser';
import { XandrPublisherClient } from './publisher';
import { XandrReportClient } from './report';
import { XandrInsertionOrderClient } from './insertion-order';
import { XandrProfileClient } from './profile';
import { XandrCityClient } from './city';
import { XandrRegionClient } from './region';
import { XandrDmaClient } from './dma';
import { XandrBSSClient } from './bss';
import { XandrDomainListClient } from './domain-list';
import { XandrInventoryListClient } from './inventory-list';

export const defaultApiUrl = 'https://api.appnexus.com';
export { sanitizeUrlFormat } from './apd/utils';
export { XandrError };

export class XandrClient {
  public inventoryList: XandrInventoryListClient = new XandrInventoryListClient(this);

  public domainList: XandrDomainListClient = new XandrDomainListClient(this);

  public customModel: XandrCustomModelClient = new XandrCustomModelClient(this);

  public advertiser: XandrAdvertiserClient = new XandrAdvertiserClient(this);

  public publisher: XandrPublisherClient = new XandrPublisherClient(this);

  public apd: XandrAPDClient = new XandrAPDClient(this);

  public lineItem: XandrLineItemClient = new XandrLineItemClient(this);

  public segment: XandrSegmentClient = new XandrSegmentClient(this);

  public segmentBillingCategory: XandrSegmentBillingCategoryClient = new XandrSegmentBillingCategoryClient(this);

  public placement: XandrPlacementClient = new XandrPlacementClient(this);

  public report: XandrReportClient = new XandrReportClient(this);

  public insertionOrder: XandrInsertionOrderClient = new XandrInsertionOrderClient(this);

  public profile: XandrProfileClient = new XandrProfileClient(this);

  public city: XandrCityClient = new XandrCityClient(this);

  public region: XandrRegionClient = new XandrRegionClient(this);

  public dma: XandrDmaClient = new XandrDmaClient(this);

  public bss: XandrBSSClient = new XandrBSSClient(this);

  public readonly apiUrl: string;

  private readonly creds: AuthParameters;

  private token: string | null = null;

  public constructor (params: AuthParameters, apiUrl: string = defaultApiUrl) {
    this.creds = params;
    this.apiUrl = apiUrl;
  }

  public getToken (): string | null {
    return this.token;
  }

  public async execute<ExpectedResponseType> (params: RequestParameters): Promise<ExpectedResponseType> {
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

  public async executeStream (params: RequestParameters): Promise<NodeJS.ReadableStream> {
    if (this.token === null)
      await this.authenticate();
    try {
      if (!params.headers)
        params.headers = {};
      params.headers.Authorization = this.token ?? '';
      const resp = await requestStream(params, this.apiUrl);
      return resp;
    } catch (error: unknown) {
      if (error instanceof XandrError) {
        if (error.code === 'NOAUTH') {
          await this.authenticate();
          const resp = await this.executeStream(params);
          return resp;
        }
        if (error.status === 429) {
          const secs = error.headers['Retry-After'] || error.headers['retry-after'];
          await sleep(secs ? Number(secs) * 1000 : 0);
          const resp =  await this.executeStream(params);
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