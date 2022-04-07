import { XandrClient } from '../index';
import { request } from '../utils';
import { CustomModelGetAllResponse, CustomModelParameters, CustomModelResponse, CustomModel } from './types';

export class XandrCustomModelClient {
  private token: string = '';
  private client: XandrClient;

  constructor(client: XandrClient) {
    this.client = client;
  }

  authenticate(token: string) {
    this.token = token;
  }

  async get(id: number): Promise<CustomModel> {
    const customModel = await request<CustomModelResponse>({
      method: 'GET',
      endpoint: 'custom-model',
      headers: { Authorization: this.token },
      query: { id }
    });
    return customModel.custom_model;
  }

  async getAll(): Promise<CustomModel[]> {
    var customModels = [] as CustomModel[];
    var customModelsResponse: CustomModelGetAllResponse;
    var index = 0;
    do {
      customModelsResponse = await request<CustomModelGetAllResponse>({
        method: 'GET',
        endpoint: 'custom-model',
        headers: { Authorization: this.token },
        query: { start_element: index }
      });
      customModels = customModels.concat(customModelsResponse.custom_models);
      index += customModelsResponse.count;
    } while (customModelsResponse.count === customModelsResponse.num_elements)
    return customModels;
  }

  async create(props: CustomModelParameters): Promise<CustomModel> {
    const customModel = await request<CustomModelResponse>({
      method: 'POST',
      endpoint: 'custom-model',
      headers: { Authorization: this.token },
      body: { custom_model: props }
    });
    return customModel.custom_model;
  }

  async modify(id: number, props: CustomModelParameters): Promise<CustomModel> {
    const customModel = await request<CustomModelResponse>({
      method: 'PUT',
      endpoint: 'custom-model',
      headers: { Authorization: this.token },
      query: { id },
      body: { custom_model: props }
    });
    return customModel.custom_model;
  }

  async delete(id: number): Promise<void> {
    await request<void>({
      method: 'DELETE',
      endpoint: 'custom-model',
      query: { id },
      headers: { Authorization: this.token }
    });
  }
}