/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';

import type {
  DmaGetParameter,
  DmaResponse,
  Dma
} from './types';

export class XandrDmaClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'dma';

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async get (params: DmaGetParameter): Promise<Dma[]> {
    const dmas: Dma[] = [];
    let done = false;
    do {
      const response = await this.client.execute<DmaResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: {
          start_element: dmas.length,
          ...params
        }
      });
      if (response.dmas) {
        dmas.push(...response.dmas);
      } else if (response.dma) {
        dmas.push(response.dma);
      }
      done = response.count === dmas.length;
    } while (!done);
    return dmas;
  }
}