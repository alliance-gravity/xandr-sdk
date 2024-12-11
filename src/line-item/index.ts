/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';
import { XandrError } from '../errors';
import type { CommonResponse } from '../xandr-types';
import type {
  LineItem,
  PostLineItemParameters,
  PutLineItemParameters,
  GetLineItemParameters,
  ModifyLineItemParameters,
  ModifyLineItemModelParameters,
  LineItemBaseResponse,
  LineItemGetResponse,
  LineItemOneResponse,
  LineItemModelId,
  GetLineItemModelResponse,
  AssociateOrModifyLineItemModelResponse,
  Split
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
      const response = await this.client.execute<LineItemGetResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { start_element: lineItems.length, ...'code' in params
          ? { code: params.code, advertiser_code: params.advertiserCode }
          : 'advertiserId' in params
            ? { advertiser_id: params.advertiserId }
            : { id: params.idList.join(',') }
        }
      });
      if (response['line-items']) {
        lineItems.push(...response['line-items']);
      } else if (response['line-item']) {
        lineItems.push(response['line-item']);
      }
      done = response.count === lineItems.length;
    } while (!done);
    return lineItems;
  }

  public async search (searchTerm: string): Promise<LineItem[]> {
    const lineItems: LineItem[] = [];
    let done = false;
    do {
      const response = await this.client.execute<LineItemGetResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { search: searchTerm, start_element: lineItems.length }
      });
      if (response['line-items']) {
        lineItems.push(...response['line-items']);
      } else if (response['line-item']) {
        lineItems.push(response['line-item']);
      }
      done = response.count === lineItems.length;
    } while (!done);
    return lineItems;
  }

  public async add (advertiserId: number, lineItem: PostLineItemParameters): Promise<LineItem> {
    const response = await this.client.execute<LineItemOneResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: { advertiser_id: advertiserId },
      body: lineItem
    });
    return response['line-item'];
  }

  public async modify (params: ModifyLineItemParameters, lineItem: PutLineItemParameters): Promise<LineItem> {
    const response = await this.client.execute<LineItemOneResponse>({
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

  public async getModel (lineItemId: number): Promise<LineItemModelId[]> {
    const response = await this.client.execute<GetLineItemModelResponse>({
      method: 'GET',
      endpoint: `${this.endpoint}-model`,
      query: {id: lineItemId}
    });
    return response.line_item_models[`${lineItemId}`];
  }

  public async associateOrModify (lineItemId: number, lineItemModelId: ModifyLineItemModelParameters): Promise<LineItemModelId[]> {
    const response = await this.client.execute<AssociateOrModifyLineItemModelResponse>({
      method: 'PUT',
      endpoint: `${this.endpoint}-model`,
      query: {id: lineItemId},
      body: Array.isArray(lineItemModelId) ? {'line_item_models':lineItemModelId} : {'line_item_model':lineItemModelId}
    });
    return response.line_item_model;
  }

  public async deleteModel (lineItemId: number, lineItemModelId: ModifyLineItemModelParameters): Promise<void> {
    await this.client.execute<CommonResponse>({
      method: 'DELETE',
      endpoint: `${this.endpoint}-model`,
      query: {id: lineItemId},
      body: Array.isArray(lineItemModelId) ? {'line_item_models':lineItemModelId} : {'line_item_model':lineItemModelId}
    });
  }

  public async getSplits (lineItemId: number): Promise<Split[]> {
    try {
      return await this.client.execute<Split[]>({
        method: 'GET',
        endpoint: `budget-splitter/${lineItemId}/splits`
      });
    } catch (err: unknown) {
      // HTTP 404 in case of no splits found
      if (err instanceof XandrError && err.status === 404) {
        return [];
      }
      throw err;
    }
  }

  public async setSplits (lineItemId: number, splits: Split[]): Promise<Split[]> {
    const response = await this.client.execute<Split[]>({
      method: 'PUT',
      endpoint: `budget-splitter/${lineItemId}/splits`,
      body: splits
    });
    return response;
  }

  public async updateSplit (lineItemId: number, split: Split): Promise<Split[]> {
    const response = await this.client.execute<Split[]>({
      method: 'PATCH',
      endpoint: `budget-splitter/${lineItemId}/splits`,
      body: [ split ]
    });
    return response;
  }

  public async deleteSplits (lineItemId: number): Promise<void> {
    await this.client.execute<CommonResponse>({
      method: 'DELETE',
      endpoint: `budget-splitter/${lineItemId}/splits`
    });
  }
}