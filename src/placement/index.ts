/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';
import type {
  Placement,
  PlacementInput,
  GetPlacementParams,
  CreatePlacementParams,
  ModifyPlacementParams,
  PlacementResponse,
  PlacementVerification,
  PlacementVerificationTarget,
  VerifyPlacementOptions
} from './types';
import { withTimeout } from '../utils';
import { getFailedVerification, verifyPlacement } from './validation';

const MAX_TIMEOUT_MS = 2147483647;

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
      const fetchedCount = placements.length;
      if (response.placement)
        placements.push(response.placement);
      if (response.placements)
        placements.push(...response.placements);
      const count: unknown = response.count;
      done = typeof count !== 'number' || count <= placements.length || placements.length === fetchedCount;
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

  public async verify (targets: PlacementVerificationTarget[], options: VerifyPlacementOptions = {}): Promise<PlacementVerification[]> {
    const { batchSize = 100, timeoutMs = 60000 } = options;
    if (!Number.isInteger(batchSize) || batchSize < 1)
      throw new Error(`batchSize must be a positive integer, received ${batchSize}`);
    if (!Number.isInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > MAX_TIMEOUT_MS)
      throw new Error(`timeoutMs must be an integer between 1 and ${MAX_TIMEOUT_MS}, received ${timeoutMs}`);

    const placementIds = [ ...new Set(targets.map(target => target.placementId)) ];
    const placements = new Map<number, Placement>();
    const failures = new Map<number, unknown>();
    for (let offset = 0; offset < placementIds.length; offset += batchSize) {
      const batch = placementIds.slice(offset, offset + batchSize);
      try {
        const batchPlacements = await withTimeout(
          this.get({ placementIds: batch }),
          timeoutMs,
          `the GET of the ${batch.length} placement(s) at offset ${offset}`
        );
        batchPlacements.forEach(placement => placements.set(placement.id, placement));
      } catch (error: unknown) {
        batch.forEach(placementId => failures.set(placementId, error));
      }
    }

    return targets.map(target => failures.has(target.placementId)
      ? getFailedVerification(target, failures.get(target.placementId))
      : verifyPlacement(target, placements.get(target.placementId) ?? null));
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