/* eslint-disable @typescript-eslint/naming-convention */

export interface CustomModel {
  id: number;
  name: string;
  code: string;
  member_id: number;
  advertiser_id: number;
  custom_model_structure: 'decision_tree';
  model_output: 'bid_modifier' | 'bid';
  model_text: string;
  original_text: string;
  active: boolean;
  last_modified: string;
}

export interface CreateCustomModelParameters {
  name: string;
  code?: string;
  member_id?: number;
  advertiser_id: number;
  custom_model_structure: 'decision_tree';
  model_output: 'bid_modifier' | 'bid';
  model_text?: string;
  active?: boolean;
}

export interface ModifyCustomModelParameters {
  name?: string;
  code?: string;
  member_id?: number;
  advertiser_id?: number;
  custom_model_structure?: 'decision_tree';
  model_output?: 'bid_modifier' | 'bid';
  model_text?: string;
  active?: boolean;
}

export interface CustomModelDefaultResponse {
  status: string;
  count: number;
  start_element?: number;
  num_elements?: number;
}

export type CustomModelsResponse = CustomModelDefaultResponse & {
  custom_models: CustomModel[];
};

export type CustomModelResponse = CustomModelDefaultResponse & {
  custom_model: CustomModel;
};