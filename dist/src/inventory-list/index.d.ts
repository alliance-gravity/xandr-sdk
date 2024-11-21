import type { XandrClient } from '..';
import type { InventoryList, InventoryListPostParameters, InventoryListPutParameters, InventoryListItem, InventoryListItemPostParameters, InventoryListItemPutParameters } from './types';
export declare class XandrInventoryListClient {
    private readonly client;
    private readonly endpoint;
    private readonly defaultHeaders;
    constructor(client: XandrClient);
    getInventoryListId(id: number): Promise<number>;
    get(id: number): Promise<InventoryList[]>;
    search(search: string): Promise<InventoryList[]>;
    searchItem(listId: number, search: string): Promise<InventoryListItem[]>;
    getAll(): Promise<InventoryList[]>;
    getAllItems(listId: number): Promise<InventoryListItem[]>;
    create(props: InventoryListPostParameters): Promise<InventoryList>;
    addItems(listId: number, props: InventoryListItemPostParameters): Promise<InventoryListItem[]>;
    addOneItem(listId: number, props: InventoryListItemPostParameters): Promise<InventoryListItem>;
    modify(id: number, props: InventoryListPutParameters): Promise<InventoryList>;
    modifyItem(listId: number, itemId: number, props: InventoryListItemPutParameters): Promise<InventoryListItem>;
    delete(id: number): Promise<void>;
    deleteItem(listId: number, itemId: number): Promise<void>;
}
