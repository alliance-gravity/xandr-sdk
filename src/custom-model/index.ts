import type { XandrClient } from '..';
import type { CommonResponse } from '../xandr-types';
import type { 
  CreateCustomModelParameters,
  ModifyCustomModelParameters,
  CustomModelParserResponse,
  CustomModelResponse,
  CustomModelsResponse,
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
    const customModels = [] as CustomModel[];
    let done = false;
    do {
      const response = await this.client.execute<CustomModelsResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        query: { start_element: customModels.length }
      });
      customModels.push(...response.custom_models);
      done = response.count !== customModels.length;
    } while (!done);
    return customModels;
  }

  public async parse (modelText: string): Promise<number> {
    const response = await this.client.execute<CustomModelParserResponse>({
      method: 'post',
      endpoint: `${this.endpoint}-parser`,
      body: {
        'custom-model-parser': {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          model_text: Buffer.from(modelText).toString('base64')
        }
      }
    });
    return response['custom-model-parser'].size;
  }

  public async create (props: CreateCustomModelParameters): Promise<CustomModel> {
    if (props.model_text !== undefined)
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

  public async modify (id: number, props: ModifyCustomModelParameters): Promise<CustomModel> {
    if (props.model_text !== undefined)
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

  public async delete (id: number): Promise<CommonResponse> {
    const response = await this.client.execute<CommonResponse>({
      method: 'DELETE',
      endpoint: this.endpoint,
      query: { id }
    });
    return response;
  }
}