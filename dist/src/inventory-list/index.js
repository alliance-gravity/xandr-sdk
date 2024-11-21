"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrInventoryListClient = void 0;
class XandrInventoryListClient {
    constructor(client) {
        this.endpoint = 'inventory-list';
        this.defaultHeaders = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json'
        };
        this.client = client;
    }
    async getInventoryListId(id) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: this.endpoint,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            query: { inventory_url_list_id: id }
        });
        return response;
    }
    async get(id) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: `${this.endpoint}/${id}`
        });
        return response['inventory-lists'];
    }
    async search(search) {
        const inventoryLists = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                query: { search, start_element: inventoryLists.length }
            });
            inventoryLists.push(...response['inventory-lists']);
            done = response.count !== inventoryLists.length;
        } while (!done);
        return inventoryLists;
    }
    async searchItem(listId, search) {
        const inventoryListItems = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: `${this.endpoint}/${listId}/item/`,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                query: { search, start_element: inventoryListItems.length }
            });
            inventoryListItems.push(...response['inventory-list-items']);
            done = response.count !== inventoryListItems.length;
        } while (!done);
        return inventoryListItems;
    }
    async getAll() {
        const inventoryLists = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                // eslint-disable-next-line @typescript-eslint/naming-convention
                query: { start_element: inventoryLists.length }
            });
            inventoryLists.push(...response['inventory-lists']);
            done = response.count !== inventoryLists.length;
        } while (!done);
        return inventoryLists;
    }
    async getAllItems(listId) {
        const response = await this.client.execute({
            method: 'GET',
            endpoint: `${this.endpoint}/${listId}/item`
        });
        return response['inventory-list-items'];
    }
    async create(props) {
        const response = await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            body: { 'inventory-list': props }
        });
        return response['inventory-list'];
    }
    async addItems(listId, props) {
        const response = await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/${listId}/item`,
            body: { 'inventory-list-items': props }
        });
        return response['inventory-list-items'];
    }
    async addOneItem(listId, props) {
        const response = await this.client.execute({
            method: 'POST',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/${listId}/item`,
            body: { 'inventory-list-item': props }
        });
        return response['inventory-list-item'];
    }
    async modify(id, props) {
        const response = await this.client.execute({
            method: 'PUT',
            headers: this.defaultHeaders,
            endpoint: this.endpoint,
            query: { id },
            body: { 'inventory-list': props }
        });
        return response['inventory-list'];
    }
    async modifyItem(listId, itemId, props) {
        const response = await this.client.execute({
            method: 'PUT',
            headers: this.defaultHeaders,
            endpoint: `${this.endpoint}/${listId}/item/${itemId}`,
            body: { 'inventory-list': props }
        });
        return response['inventory-list-item'];
    }
    async delete(id) {
        await this.client.execute({
            method: 'DELETE',
            endpoint: this.endpoint,
            query: { id }
        });
    }
    async deleteItem(listId, itemId) {
        await this.client.execute({
            method: 'DELETE',
            endpoint: `${this.endpoint}/${listId}/item`,
            query: { id: itemId }
        });
    }
}
exports.XandrInventoryListClient = XandrInventoryListClient;
