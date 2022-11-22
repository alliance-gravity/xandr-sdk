/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';
import type {
  LineItem,
  LineItemParameters,
  GetLineItemParameters,
  ModifyLineItemParameters,
  LineItemBaseResponse,
  LineItemGetAllResponse,
  LineItemResponse
} from './types';

export class XandrLineItemClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'line-item';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async get (params: GetLineItemParameters): Promise<LineItem[]> {
    const lineItems: LineItem[] = [];
    let done = false;
    do {
      const response = await this.client.execute<LineItemGetAllResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { start_element: lineItems.length, ...'code' in params
          ? { code: params.code, advertiser_code: params.advertiserCode }
          : 'advertiserId' in params
            ? { advertiser_id: params.advertiserId }
            : { id: params.idList.join(',') }
        }
      });
      lineItems.push(...response['line-items']);
      done = response.count === lineItems.length;
    } while (!done);
    return lineItems;
  }

  public async search (searchTerm: string): Promise<LineItem[]> {
    const lineItems: LineItem[] = [];
    let done = false;
    do {
      const response = await this.client.execute<LineItemGetAllResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { search: searchTerm, start_element: lineItems.length }
      });
      lineItems.push(...response['line-items']);
      done = response.count === lineItems.length;
    } while (!done);
    return lineItems;
  }

  public async add (advertiserId: number, lineItem: LineItemParameters): Promise<LineItem> {
    const response = await this.client.execute<LineItemResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: { advertiser_id: advertiserId },
      body: lineItem
    });
    return response['line-item'];
  }

  public async modify (params: ModifyLineItemParameters, lineItem: LineItemParameters): Promise<LineItem> {
    const response = await this.client.execute<LineItemResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      query: 'id' in params
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ? { id: params.id, advertiser_id: params.advertiserId }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        : { code: params.code, advertiser_code: params.advertiserCode},
      body: lineItem
    });
    return response['line-item'];
  }

  public async delete (params: ModifyLineItemParameters): Promise<void> {
    await this.client.execute<LineItemBaseResponse>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query: 'id' in params
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ? { id: params.id, advertiser_id: params.advertiserId }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        : { code: params.code, advertiser_code: params.advertiserCode}
    });
  }
}