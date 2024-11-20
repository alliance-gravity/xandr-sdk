import type { XandrClient } from '..';
import type { CommonResponse } from '../xandr-types';

import type {
  DomainList,
  DomainListPostParameters,
  DomainListPutParameters,
  DomainListGetParameters,
  DomainListResponse,
  DomainListsResponse
} from './types';

export class XandrDomainListClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'domain-list';

  private readonly defaultHeaders = {
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async get (params: DomainListGetParameters): Promise<DomainList> {
    const response = await this.client.execute<DomainListResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      query: { ...params }
    });
    return response['domain-list'];
  }

  public async getAll (): Promise<DomainList[]> {
    const DomainLists = [] as DomainList[];
    let done = false;
    do {
      const response = await this.client.execute<DomainListsResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { start_element: DomainLists.length }
      });
      DomainLists.push(...response['domain-lists']);
      done = response.count !== DomainLists.length;
    } while (!done);
    return DomainLists;
  }

  public async create (props: DomainListPostParameters): Promise<DomainList> {
    const response = await this.client.execute<DomainListResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      body: { 'domain-list': props }
    });
    return response['domain-list'];
  }

  public async modify (id: number, props: DomainListPutParameters): Promise<DomainList> {
    const response = await this.client.execute<DomainListResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      query: { id },
      body: { 'domain-list': props }
    });
    return response['domain-list'];
  }

  public async delete (id: number): Promise<void> {
    await this.client.execute<CommonResponse>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query: { id }
    });
  }
}