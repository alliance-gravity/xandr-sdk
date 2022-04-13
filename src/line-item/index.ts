import type { XandrClient } from '..';
import type {
  LineItem,
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
    const response = await this.client.execute<LineItemGetAllResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      query: 'code' in params
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ? { code: params.code, advertiser_code: params.advertiserCode }
        : 'advertiserId' in params
          // eslint-disable-next-line @typescript-eslint/naming-convention
          ? { advertiser_id: params.advertiserId }
          : { id: params.idList.join(',') }
    });
    return response['line-items'];
  }

  public async search (searchTerm: string): Promise<LineItem[]> {
    const response = await this.client.execute<LineItemGetAllResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      query: { search: searchTerm }
    });
    return response['line-items'];
  }

  public async add (advertiserId: number, lineItem: LineItem): Promise<LineItem> {
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

  public async modify (params: ModifyLineItemParameters, lineItem: LineItem): Promise<LineItem> {
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