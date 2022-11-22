import type { XandrClient } from '..';
import type { GetPublisherParameters, ModifyPublisherParameters, DeletePublisherParameters, PublisherInput, Publisher } from './types';
export declare class XandrPublisherClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    get(params?: GetPublisherParameters): Promise<Publisher[]>;
    add(publisher: PublisherInput, CreateDefaultPlacement?: boolean): Promise<Publisher | undefined>;
    modify(params: ModifyPublisherParameters, publisher: PublisherInput): Promise<Publisher | undefined>;
    remove(params: DeletePublisherParameters): Promise<void>;
}
