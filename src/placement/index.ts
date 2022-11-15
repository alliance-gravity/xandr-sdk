import type { XandrClient } from '..';
import type {
  Placement,
  PlacementInput,
  GetPlacementParams,
  PostPlacementParams,
  PutPlacementParams,
  PlacementResponse
} from './types';

export class XandrPlacementClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'placement';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }


  public async get (params: GetPlacementParams): Promise<Placement[]> {
    const response = await this.client.execute<PlacementResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      query: 'publisherId' in params
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ? { publisher_id: params.publisherId }
        : { id: params.placementIds.join(',') }
    });
    if ('placement' in response)
      return [ response.placement ];
    if ('placements' in response)
      return response.placements;
    return [];
  }

  public async add (params: PostPlacementParams, placement: PlacementInput): Promise<Placement> {
    const response = await this.client.execute<PlacementResponse>({
      method: 'POST',
      endpoint: this.endpoint,
      headers: this.defaultHeaders,
      query: 'publisherId' in params
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ? { publisher_id: params.publisherId }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        : { site_id: params.siteId },
      body: { placement }
    });
    return response.placement;
  }

  public async modify (params: PutPlacementParams, placement: PlacementInput): Promise<Placement> {
    const response = await this.client.execute<PlacementResponse>({
      method: 'PUT',
      endpoint: this.endpoint,
      headers: this.defaultHeaders,
      query: 'publisherId' in params
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ? { id: params.placementId, publisher_id: params.publisherId }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        : { code: params.placementId, site_id: params.siteId },
      body: { placement }
    });
    return response.placement;
  }

  public async remove (params: PutPlacementParams): Promise<void> {
    await this.client.execute<null>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query: 'publisherId' in params
        // eslint-disable-next-line @typescript-eslint/naming-convention
        ? { id: params.placementId, publisher_id: params.publisherId }
        // eslint-disable-next-line @typescript-eslint/naming-convention
        : { code: params.placementId, site_id: params.siteId }
    });
  }
}