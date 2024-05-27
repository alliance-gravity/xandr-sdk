import type { XandrClient } from '..';
import type { InsertionOrder, PostInsertionOrderParameters, PutInsertionOrderParameters, GetInsertionOrderParameters, ModifyInsertionOrderParameters, InsertionOrderBaseResponse, InsertionOrderResponse } from './types';
export declare class XandrInsertionOrderClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    get(params: GetInsertionOrderParameters): Promise<InsertionOrder[]>;
    search(searchTerm: string): Promise<InsertionOrder[]>;
    add(advertiserId: number, insertionOrder: PostInsertionOrderParameters): Promise<InsertionOrderResponse>;
    modify(params: ModifyInsertionOrderParameters, insertionOrder: PutInsertionOrderParameters): Promise<InsertionOrderResponse>;
    delete(params: ModifyInsertionOrderParameters): Promise<InsertionOrderBaseResponse>;
}
