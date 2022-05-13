"use strict";
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const index_1 = require("../src/index");
const errors_1 = require("../src/errors");
const nock_1 = __importDefault(require("nock"));
const intercept = process.env.ENABLE_NOCK === 'true';
let describeMessage = '(using real API)';
if (intercept)
    describeMessage = '(nock intercepted)';
const username = 'x';
const password = 'x';
const endpoint = '/line-item';
(0, mocha_1.describe)(`Line Item API ${describeMessage}`, () => {
    const client = new index_1.XandrClient({ username, password });
    (0, mocha_1.before)(() => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).post('/auth').reply(200, { response: { token: 'token' } });
    });
    (0, mocha_1.after)(() => {
        nock_1.default.cleanAll();
    });
    (0, mocha_1.it)('Add', async () => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).post(endpoint).query(true).reply(201, { response: { 'line-item': { id: 123 } } });
        const lineItem = await client.lineItem.add(1, {
            id: 123,
            name: 'lineItemTest',
            revenue_value: 100,
            ad_types: ['banner']
        });
        (0, chai_1.expect)(lineItem.id).to.equal(123);
    });
    (0, mocha_1.it)('Get existing', async () => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).get(endpoint).query(true).reply(200, { response: { 'line-items': [{ id: 123 }, { id: 456 }] } });
        const lineItems = await client.lineItem.get({
            idList: [123, 456]
        });
        (0, chai_1.expect)(lineItems.length).to.equal(2);
        (0, chai_1.expect)(lineItems[0].id).to.equal(123);
        (0, chai_1.expect)(lineItems[1].id).to.equal(456);
    });
    (0, mocha_1.it)('Get non-existing', async () => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).get(endpoint).query(true).reply(404, { response: { error: 'line item not found', error_id: 'NOTFOUND' } });
        try {
            await client.lineItem.get({
                idList: [0]
            });
        }
        catch (error) {
            (0, chai_1.expect)(error).instanceOf(errors_1.XandrError);
            const xandrError = error;
            (0, chai_1.expect)(xandrError.status).to.equal(404);
        }
    });
});
