import type { XandrClient } from '../index';
import type { 
  CustomModelGetAllResponse,
  CustomModelParameters,
  CustomModelResponse,
  CustomModelBaseResponse,
  CustomModel 
} from './types';

export class XandrCustomModelClient {
  private readonly client: XandrClient;

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async get (id: number): Promise<CustomModel> {
    const customModel = await this.client.execute<CustomModelResponse>({
      method: 'GET',
      endpoint: 'custom-model',
      query: { id }
    });
    return customModel.custom_model;
  }

  public async getAll (): Promise<CustomModel[]> {
    let customModels = [] as CustomModel[];
    let index = 0;
    let done = false;
    do {
      const customModelsResponse = await this.client.execute<CustomModelGetAllResponse>({
        method: 'GET',
        endpoint: 'custom-model',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        query: { start_element: index }
      });
      customModels = customModels.concat(customModelsResponse.custom_models);
      index += customModelsResponse.count;
      done = customModelsResponse.count !== customModelsResponse.num_elements;
    } while (!done);
    return customModels;
  }

  public async create (props: CustomModelParameters): Promise<CustomModel> {
    props.model_text = Buffer.from(props.model_text).toString('base64');
    const customModel = await this.client.execute<CustomModelResponse>({
      method: 'POST',
      endpoint: 'custom-model',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { custom_model: props }
    });
    return customModel.custom_model;
  }

  public async modify (id: number, props: CustomModelParameters): Promise<CustomModel> {
    props.model_text = Buffer.from(props.model_text).toString('base64');
    const customModel = await this.client.execute<CustomModelResponse>({
      method: 'PUT',
      endpoint: 'custom-model',
      query: { id },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      body: { custom_model: props }
    });
    return customModel.custom_model;
  }

  public async delete (id: number): Promise<void> {
    await this.client.execute<CustomModelBaseResponse>({
      method: 'DELETE',
      endpoint: 'custom-model',
      query: { id }
    });
  }
}