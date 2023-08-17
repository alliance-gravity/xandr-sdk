/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';

import type {
  InsertionOrder,
  InsertionOrderParameters,
  GetInsertionOrderParameters,
  ModifyInsertionOrderParameters,
  InsertionOrderBaseResponse,
  InsertionOrderGetAllResponse,
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
      const response = await this.client.execute<InsertionOrderGetAllResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { start_element: insertionOrders.length, 
          ...'id' in params
            ? { id: params.id }
            : 'advertiserId' in params
              ? { advertiser_id: params.advertiserId }
              : { id: params.idList.join(',') }
        }
      });
      insertionOrders.push(...response['insertion-orders']);
      done = response.count === insertionOrders.length;
    } while (!done);
    return insertionOrders;
  }

  public async search (searchTerm: string): Promise<InsertionOrder[]> {
    const insertionOrders: InsertionOrder[] = [];
    let done = false;
    do {
      const response = await this.client.execute<InsertionOrderGetAllResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { search: searchTerm, start_element: insertionOrders.length }
      });
      insertionOrders.push(...response['insertion-orders']);
      done = response.count === insertionOrders.length;
    } while (!done);
    return insertionOrders;
  }

  public async add (advertiserId: number, insertionOrder: InsertionOrderParameters): Promise<InsertionOrder> {
    const response = await this.client.execute<InsertionOrderResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: { advertiser_id: advertiserId },
      body: insertionOrder
    });
    return response['insertion-order'];
  }
  
  public async modify (params: ModifyInsertionOrderParameters, insertionOrder: InsertionOrderParameters): Promise<InsertionOrder> {
    const response = await this.client.execute<InsertionOrderResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      query: { id: params.id, advertiser_id: params.advertiserId },
      body: insertionOrder
    });
    return response['insertion-order'];
  }

  public async delete (params: ModifyInsertionOrderParameters): Promise<void> {
    await this.client.execute<InsertionOrderBaseResponse>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query: { id: params.id, advertiser_id: params.advertiserId }
    });
  }

}