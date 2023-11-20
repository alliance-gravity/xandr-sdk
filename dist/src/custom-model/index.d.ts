import type { XandrClient } from '..';
import type { CreateCustomModelParameters, ModifyCustomModelParameters, CustomModel } from './types';
export declare class XandrCustomModelClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    get(id: number): Promise<CustomModel>;
    getAll(): Promise<CustomModel[]>;
    parse(modelText: string): Promise<number>;
    create(props: CreateCustomModelParameters): Promise<CustomModel>;
    modify(id: number, props: ModifyCustomModelParameters): Promise<CustomModel>;
    delete(id: number): Promise<void>;
}
