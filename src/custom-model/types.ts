export interface CustomModel {
  id: number;
  name: string;
  member_id: number;
  advertiser_id: number;
  custom_model_structure: string;
  model_output: string;
  model_text: string;
  original_text: string;
  active: boolean;
  last_modified: string;
}

export interface CustomModelParameters {
  name: string;
  advertiser_id: number;
  custom_model_structure: string;
  model_output: string;
  model_text: string;
  code?: string;
  active?: boolean;
}

export interface CustomModelBaseResponse {
  status: string;
  count: number;
  start_element: number;
  num_elements: number;
}

export type CustomModelGetAllResponse = CustomModelBaseResponse & {
  custom_models: CustomModel[];
}

export type CustomModelResponse = CustomModelBaseResponse & {
  custom_model: CustomModel;
}