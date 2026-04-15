/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';

import type {
  Site,
  PostSiteParameters,
  PutSiteParameters,
  GetSiteParameters,
  ModifySiteParameters,
  SiteBaseResponse,
  SiteResponse
} from './types';

export class XandrSiteClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'site';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async get (params?: GetSiteParameters): Promise<Site[]> {
    const sites: Site[] = [];
    let done = false;
    do {
      const query: Record<string, number | string> = { start_element: sites.length };
      if (params) {
        if ('idList' in params) {
          query.id = params.idList.join(',');
        } else if ('id' in params) {
          query.id = params.id;
          if (params.publisherId !== undefined)
            query.publisher_id = params.publisherId;
        } else {
          query.publisher_id = params.publisherId;
        }
      }
      const response = await this.client.execute<SiteResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query
      });
      if (response.sites) {
        sites.push(...response.sites);
      } else if (response.site) {
        sites.push(response.site);
      }
      done = response.count === sites.length;
    } while (!done);
    return sites;
  }

  public async add (publisherId: number, site: PostSiteParameters): Promise<SiteResponse> {
    const response = await this.client.execute<SiteResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      query: { publisher_id: publisherId },
      body: { site }
    });
    return response;
  }

  public async modify (params: ModifySiteParameters, site: PutSiteParameters): Promise<SiteResponse> {
    const query: Record<string, number | string> = { id: params.id };
    if (params.publisherId !== undefined)
      query.publisher_id = params.publisherId;
    const response = await this.client.execute<SiteResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      query,
      body: { site }
    });
    return response;
  }

  public async delete (params: ModifySiteParameters): Promise<SiteBaseResponse> {
    const query: Record<string, number | string> = { id: params.id };
    if (params.publisherId !== undefined)
      query.publisher_id = params.publisherId;
    const response = await this.client.execute<SiteBaseResponse>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query
    });
    return response;
  }
}
