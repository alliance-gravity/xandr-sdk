import type { XandrClient } from '..';
import type { LineItem, LineItemParameters, GetLineItemParameters, ModifyLineItemParameters } from './types';
export declare class XandrLineItemClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    get(params: GetLineItemParameters): Promise<LineItem[]>;
    search(searchTerm: string): Promise<LineItem[]>;
    add(advertiserId: number, lineItem: LineItemParameters): Promise<LineItem>;
    modify(params: ModifyLineItemParameters, lineItem: LineItemParameters): Promise<LineItem>;
    delete(params: ModifyLineItemParameters): Promise<void>;
}
