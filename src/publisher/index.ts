/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';
import type {
  GetPublisherParameters,
  ModifyPublisherParameters,
  DeletePublisherParameters,
  PublisherInput,
  Publisher,
  PublisherResponse
} from './types';

export class XandrPublisherClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'publisher';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }


  public async get (params?: GetPublisherParameters): Promise<Publisher[]> {
    const publishers: Publisher[] = [];
    let done = false;
    do {
      const response = await this.client.execute<PublisherResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { start_element: publishers.length, ...params
          ? { id: params.publisherIds.join(',') }
          : undefined
        }
      });
      if (response.publisher)
        publishers.push(response.publisher);
      if (response.publishers)
        publishers.push(...response.publishers);
      done = publishers.length === response.count;
    } while (!done);
    return publishers;
  }

  public async add (publisher: PublisherInput, CreateDefaultPlacement = false): Promise<Publisher | undefined> {
    const response = await this.client.execute<PublisherResponse>({
      method: 'POST',
      endpoint: this.endpoint,
      headers: this.defaultHeaders,
      query: { create_default_placement: CreateDefaultPlacement.toString() },
      body: { publisher }
    });
    return response.publisher;
  }

  public async modify (params: ModifyPublisherParameters, publisher: PublisherInput): Promise<Publisher | undefined> {
    const response = await this.client.execute<PublisherResponse>({
      method: 'PUT',
      endpoint: this.endpoint,
      headers: this.defaultHeaders,
      query: { id: params.publisherId },
      body: { publisher }
    });
    return response.publisher;
  }

  public async remove (params: DeletePublisherParameters): Promise<void> {
    await this.client.execute<null>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query: { id: params.publisherId }
    });
  }
}