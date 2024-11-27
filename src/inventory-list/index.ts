import type { XandrClient } from '..';
import type { CommonResponse } from '../xandr-types';
import type {
  InventoryList,
  InventoryListPostParameters,
  InventoryListPutParameters,
  InventoryListResponse,
  InventoryListsResponse,
  InventoryListItem,
  InventoryListItemPostParameters,
  InventoryListItemPutParameters,
  InventoryListItemResponse,
  InventoryListItemsResponse
} from './types';

export class XandrInventoryListClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'inventory-list';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async getInventoryListId (id: number): Promise<number> {
    const response = await this.client.execute<InventoryListsResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: { inventory_url_list_id: id }
    });
    return response['inventory-lists'][0].id;
  }

  public async get (id: number): Promise<InventoryList[]> {
    const response = await this.client.execute<InventoryListsResponse>({
      method: 'GET',
      endpoint: `${this.endpoint}/${id}`
    });
    return response['inventory-lists'];
  }

  public async search (search: string): Promise<InventoryList[]> {
    const inventoryLists = [] as InventoryList[];
    let done = false;
    do {
      const response = await this.client.execute<InventoryListsResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        query: { search, start_element: inventoryLists.length }
      });
      inventoryLists.push(...response['inventory-lists']);
      done = response.count === inventoryLists.length;
    } while (!done);
    return inventoryLists;
  }

  public async searchItem (listId: number, search: string): Promise<InventoryListItem[]> {
    const inventoryListItems = [] as InventoryListItem[];
    let done = false;
    do {
      const response = await this.client.execute<InventoryListItemsResponse>({
        method: 'GET',
        endpoint: `${this.endpoint}/${listId}/item/`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        query: { search, start_element: inventoryListItems.length }
      });
      inventoryListItems.push(...response['inventory-list-items']);
      done = response.count !== inventoryListItems.length;
    } while (!done);
    return inventoryListItems;
  }

  public async getAll (): Promise<InventoryList[]> {
    const inventoryLists = [] as InventoryList[];
    let done = false;
    do {
      const response = await this.client.execute<InventoryListsResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        query: { start_element: inventoryLists.length }
      });
      inventoryLists.push(...response['inventory-lists']);
      done = response.count === inventoryLists.length;
    } while (!done);
    return inventoryLists;
  }

  public async getAllItems (listId: number): Promise<InventoryListItem[]> {
    const inventoryListItems = [] as InventoryListItem[];
    let done = false;
    do {
      const response = await this.client.execute<InventoryListItemsResponse>({
        method: 'GET',
        endpoint: `${this.endpoint}/${listId}/item`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        query: { start_element: inventoryListItems.length }
      });
      inventoryListItems.push(...response['inventory-list-items']);
      done = inventoryListItems.length >= response.count;
    } while (!done);
    return inventoryListItems;
  }

  public async create (props: InventoryListPostParameters): Promise<InventoryList> {
    const response = await this.client.execute<InventoryListResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      body: { 'inventory-list': props }
    });
    return response['inventory-list'];
  }

  public async addItems (listId: number, props: InventoryListItemPostParameters): Promise<InventoryListItem[]> {
    const response = await this.client.execute<InventoryListItemsResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/${listId}/item`,
      body: { 'inventory-list-items': props }
    });
    return response['inventory-list-items'];
  }

  public async addOneItem (listId: number, props: InventoryListItemPostParameters): Promise<InventoryListItem> {
    const response = await this.client.execute<InventoryListItemResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/${listId}/item`,
      body: { 'inventory-list-item': props }
    });
    return response['inventory-list-item'];
  }

  public async modify (id: number, props: InventoryListPutParameters): Promise<InventoryList> {
    const response = await this.client.execute<InventoryListResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/${id}`,
      body: { 'inventory-list': props }
    });
    return response['inventory-list'];
  }

  public async modifyItem (listId: number, itemId: number, props: InventoryListItemPutParameters): Promise<InventoryListItem> {
    const response = await this.client.execute<InventoryListItemResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: `${this.endpoint}/${listId}/item/${itemId}`,
      body: { 'inventory-list': props }
    });
    return response['inventory-list-item'];
  }

  public async delete (id: number): Promise<void> {
    await this.client.execute<CommonResponse>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query: { id }
    });
  }

  public async deleteItem (listId: number, itemId: number): Promise<void> {
    await this.client.execute<CommonResponse>({
      method: 'DELETE',
      endpoint: `${this.endpoint}/${listId}/item`,
      query: { id: itemId }
    });
  }
}