/* eslint-disable @typescript-eslint/naming-convention */
export interface LineItem {
  id: number;
  code?: string;
  name: string;
  // incomplete
}

export interface LineItemId {
  id: number;
  advertiserId: number;
}

export interface LineItemCode {
  code: string;
  advertiserCode: string;
}

export type GetLineItemParameters = LineItemCode | {
  advertiserId: number;
} | {
  idList: number[];
};

export type ModifyLineItemParameters = LineItemCode | LineItemId;

export interface LineItemBaseResponse {
  status: string;
  count: number;
  start_element?: number;
  num_elements?: number;
}

export type LineItemGetAllResponse = LineItemBaseResponse & {
  'line-items': LineItem[];
};

export type LineItemResponse = LineItemBaseResponse & {
  'line-item': LineItem;
};