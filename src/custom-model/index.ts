import type { XandrClient } from '..';
import type { 
  CustomModelGetAllResponse,
  CustomModelParameters,
  CustomModelResponse,
  CustomModelBaseResponse,
  CustomModel 
} from './types';

export class XandrCustomModelClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'custom-model';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async get (id: number): Promise<CustomModel> {
    const response = await this.client.execute<CustomModelResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      query: { id }
    });
    return response.custom_model;
  }

  public async getAll (): Promise<CustomModel[]> {
    let customModels = [] as CustomModel[];
    let index = 0;
    let done = false;
    do {
      const response = await this.client.execute<CustomModelGetAllResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        query: { start_element: index }
      });
      customModels = customModels.concat(response.custom_models);
      index += response.count;
      done = response.count !== response.num_elements;
    } while (!done);
    return customModels;
  }

  public async create (props: CustomModelParameters): Promise<CustomModel> {
    props.model_text = Buffer.from(props.model_text).toString('base64');
    const response = await this.client.execute<CustomModelResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { custom_model: props }
    });
    return response.custom_model;
  }

  public async modify (id: number, props: CustomModelParameters): Promise<CustomModel> {
    props.model_text = Buffer.from(props.model_text).toString('base64');
    const response = await this.client.execute<CustomModelResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      query: { id },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { custom_model: props }
    });
    return response.custom_model;
  }

  public async delete (id: number): Promise<void> {
    await this.client.execute<CustomModelBaseResponse>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query: { id }
    });
  }
}