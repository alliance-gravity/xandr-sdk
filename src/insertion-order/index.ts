/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';

import type {
  InsertionOrder,
  PostInsertionOrderParameters,
  PutInsertionOrderParameters,
  GetInsertionOrderParameters,
  ModifyInsertionOrderParameters,
  InsertionOrderBaseResponse,
  InsertionOrderResponse
} from './types';

export class XandrInsertionOrderClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'insertion-order';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async get (params: GetInsertionOrderParameters): Promise<InsertionOrder[]> {
    const insertionOrders: InsertionOrder[] = [];
    let done = false;
    do {
      const response = await this.client.execute<InsertionOrderResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { start_element: insertionOrders.length, 
          ...'idList' in params
            ? { id: params.idList.join(',') }
            : { ...params }
        }
      });
      if (response['insertion-orders']) {
        insertionOrders.push(...response['insertion-orders']);
      } else if (response['insertion-order']) {
        insertionOrders.push(response['insertion-order']);
      }
      done = response.count === insertionOrders.length;
    } while (!done);
    return insertionOrders;
  }

  public async search (searchTerm: string): Promise<InsertionOrder[]> {
    const insertionOrders: InsertionOrder[] = [];
    let done = false;
    do {
      const response = await this.client.execute<InsertionOrderResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { search: searchTerm, start_element: insertionOrders.length }
      });
      if (response['insertion-orders']) {
        insertionOrders.push(...response['insertion-orders']);
      } else if (response['insertion-order']) {
        insertionOrders.push(response['insertion-order']);
      }
      done = response.count === insertionOrders.length;
    } while (!done);
    return insertionOrders;
  }

  public async add (advertiserId: number, insertionOrder: PostInsertionOrderParameters): Promise<InsertionOrderResponse> {
    const response = await this.client.execute<InsertionOrderResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: { advertiser_id: advertiserId },
      body: { 'insertion-order': insertionOrder }
    });
    return response;
  }
  
  public async modify (params: ModifyInsertionOrderParameters, insertionOrder: PutInsertionOrderParameters): Promise<InsertionOrderResponse> {
    const response = await this.client.execute<InsertionOrderResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      query: { id: params.id, advertiser_id: params.advertiserId },
      body: { 'insertion-order': insertionOrder }
    });
    return response;
  }

  public async delete (params: ModifyInsertionOrderParameters): Promise<InsertionOrderBaseResponse> {
    const response = await this.client.execute<InsertionOrderBaseResponse>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query: { id: params.id, advertiser_id: params.advertiserId }
    });
    return response;
  }
}