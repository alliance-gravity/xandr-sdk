import type { XandrClient } from '..';
import type { DomainList, DomainListPostParameters, DomainListPutParameters } from './types';
export declare class XandrDomainListClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    get(id: number): Promise<DomainList>;
    search(search: string): Promise<DomainList[]>;
    getAll(): Promise<DomainList[]>;
    create(props: DomainListPostParameters): Promise<DomainList>;
    modify(id: number, props: DomainListPutParameters): Promise<DomainList>;
    delete(id: number): Promise<void>;
}
