import type { XandrClient } from '..';
import type { DmaGetParameter, Dma } from './types';
export declare class XandrDmaClient {
    private readonly client;
    private readonly endpoint;
    constructor(client: XandrClient);
    get(params?: DmaGetParameter): Promise<Dma[]>;
}
