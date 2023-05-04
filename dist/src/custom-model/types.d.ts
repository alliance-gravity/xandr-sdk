import type { ReadOnlyAttributes, CommonResponse } from '../xandr-types';
export interface CustomModelInput {
    name: string;
    code?: string | null;
    advertiser_id: number;
    custom_model_structure: 'decision_tree';
    model_output: 'bid_modifier' | 'bid';
    model_text: string;
    active?: boolean;
}
export type CustomModel = ReadOnlyAttributes & Required<CustomModelInput> & {
    id: number;
    member_id: number;
    original_text: string;
};
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
export type CustomModelsResponse = CommonResponse & {
    custom_models: CustomModel[];
};
export type CustomModelResponse = CommonResponse & {
    custom_model: CustomModel;
};
