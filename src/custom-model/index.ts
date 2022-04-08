import { XandrClient } from '../index';
import { CustomModelGetAllResponse, CustomModelParameters, CustomModelResponse, CustomModel } from './types';

export class XandrCustomModelClient {
  private client: XandrClient;

  constructor(client: XandrClient) {
    this.client = client;
  }

  async get(id: number): Promise<CustomModel> {
    const customModel = await this.client.execute<CustomModelResponse>({
      method: 'GET',
      endpoint: 'custom-model',
      query: { id }
    });
    return customModel.custom_model;
  }

  async getAll(): Promise<CustomModel[]> {
    var customModels = [] as CustomModel[];
    var customModelsResponse: CustomModelGetAllResponse;
    var index = 0;
    do {
      customModelsResponse = await this.client.execute<CustomModelGetAllResponse>({
        method: 'GET',
        endpoint: 'custom-model',
        query: { start_element: index }
      });
      customModels = customModels.concat(customModelsResponse.custom_models);
      index += customModelsResponse.count;
    } while (customModelsResponse.count === customModelsResponse.num_elements)
    return customModels;
  }

  async create(props: CustomModelParameters): Promise<CustomModel> {
    props.model_text = Buffer.from(props.model_text).toString('base64');
    const customModel = await this.client.execute<CustomModelResponse>({
      method: 'POST',
      endpoint: 'custom-model',
      body: { custom_model: props }
    });
    return customModel.custom_model;
  }

  async modify(id: number, props: CustomModelParameters): Promise<CustomModel> {
    props.model_text = Buffer.from(props.model_text).toString('base64');
    const customModel = await this.client.execute<CustomModelResponse>({
      method: 'PUT',
      endpoint: 'custom-model',
      query: { id },
      body: { custom_model: props }
    });
    return customModel.custom_model;
  }

  async delete(id: number): Promise<void> {
    await this.client.execute<void>({
      method: 'DELETE',
      endpoint: 'custom-model',
      query: { id }
    });
  }
}