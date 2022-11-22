/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';
import type {
  Placement,
  PlacementInput,
  GetPlacementParams,
  CreatePlacementParams,
  ModifyPlacementParams,
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
    const placements: Placement[] = [];
    let done = false;
    do {
      const response = await this.client.execute<PlacementResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { start_element: placements.length, ...'publisherId' in params
          ? { publisher_id: params.publisherId }
          : { id: params.placementIds.join(',') }
        }
      });
      if (response.placement)
        placements.push(response.placement);
      if (response.placements)
        placements.push(...response.placements);
      done = response.count === placements.length;
    } while (!done);
    return placements;
  }

  public async add (params: CreatePlacementParams, placement: PlacementInput): Promise<Placement | undefined> {
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

  public async modify (params: ModifyPlacementParams, placement: PlacementInput): Promise<Placement | undefined> {
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

  public async remove (params: ModifyPlacementParams): Promise<void> {
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