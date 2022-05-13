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
(0, mocha_1.describe)('Authentication', () => {
    (0, mocha_1.after)(() => {
        nock_1.default.cleanAll();
    });
    (0, mocha_1.it)('First Authentication', async () => {
        (0, nock_1.default)(index_1.defaultApiUrl).post('/auth').reply(200, { response: { token: 'first token' } });
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(200, { response: {} });
        const client = new index_1.XandrClient({
            username: 'x',
            password: 'x'
        });
        (0, chai_1.expect)(client.getToken()).to.be.null;
        await client.customModel.get(0);
        (0, chai_1.expect)(client.getToken()).to.equal('first token');
    });
    (0, mocha_1.it)('Expired token re-Authentication', async () => {
        (0, nock_1.default)(index_1.defaultApiUrl).post('/auth').reply(200, { response: { token: 'first token' } });
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(200, { response: {} });
        const client = new index_1.XandrClient({
            username: 'x',
            password: 'x'
        });
        (0, chai_1.expect)(client.getToken()).to.be.null;
        await client.customModel.get(0);
        (0, chai_1.expect)(client.getToken()).to.equal('first token');
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(401, { response: { error: 'no auth', error_id: 'NOAUTH' } });
        (0, nock_1.default)(index_1.defaultApiUrl).post('/auth').reply(200, { response: { token: 'second token' } });
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(200, { response: {} });
        await client.customModel.get(0);
        (0, chai_1.expect)(client.getToken()).to.equal('second token');
    });
    (0, mocha_1.it)('Invalid Authentication', async () => {
        (0, nock_1.default)(index_1.defaultApiUrl).post('/auth').reply(401, { response: { error: 'No match...', error_id: 'UNAUTH' } });
        const client = new index_1.XandrClient({
            username: 'x',
            password: 'x'
        });
        try {
            await client.customModel.get(0);
        }
        catch (error) {
            (0, chai_1.expect)(error).instanceOf(errors_1.XandrError);
            const xandrError = error;
            (0, chai_1.expect)(xandrError.status).to.equal(401);
            (0, chai_1.expect)(xandrError.error).to.equal('No match...');
            (0, chai_1.expect)(xandrError.code).to.equals('UNAUTH');
            return;
        }
        throw new Error('Expected Error in try clause');
    });
    (0, mocha_1.it)('Token usage in requests', async () => {
        (0, nock_1.default)(index_1.defaultApiUrl).post('/auth').reply(200, { response: { token: 'token12345' } });
        (0, nock_1.default)(index_1.defaultApiUrl, {
            reqheaders: { 'Authorization': 'token12345' }
        }).get('/custom-model').query(true).reply(200, { response: { custom_model: {} } });
        const client = new index_1.XandrClient({
            username: 'x',
            password: 'x'
        });
        await client.customModel.get(0);
    });
});
(0, mocha_1.describe)('HTTP return codes handling', () => {
    (0, mocha_1.before)(() => {
        (0, nock_1.default)(index_1.defaultApiUrl).post('/auth').reply(200, { response: { token: 'token' } }).persist();
    });
    (0, mocha_1.after)(() => {
        nock_1.default.cleanAll();
    });
    (0, mocha_1.it)('Success (2xx)', async () => {
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(200, { response: { custom_model: { id: 123 } } });
        const client = new index_1.XandrClient({
            username: 'x',
            password: 'x'
        });
        const obj = await client.customModel.get(0);
        (0, chai_1.expect)(Object.keys(obj)).to.include('id');
        (0, chai_1.expect)(obj.id).to.equal(123);
    });
    (0, mocha_1.it)('No Content (204)', async () => {
        (0, nock_1.default)(index_1.defaultApiUrl).delete('/custom-model').query(true).reply(204);
        const client = new index_1.XandrClient({
            username: 'x',
            password: 'x'
        });
        await client.customModel.delete(0);
    });
    (0, mocha_1.it)('Rate limited (429) | With response (1000ms wait time)', async () => {
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(429, { response: { error: 'You have...', error_id: 'SYSTEM' } })
            .defaultReplyHeaders({ 'Retry-After': '1' });
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(200, { response: { custom_model: { id: 123 } } });
        const client = new index_1.XandrClient({
            username: 'x',
            password: 'x'
        });
        const start = Date.now();
        const obj = await client.customModel.get(0);
        const end = Date.now();
        (0, chai_1.expect)((end - start) / 1000).greaterThan(1);
        (0, chai_1.expect)(obj.id).to.equal(123);
    });
    (0, mocha_1.it)('Rate limited (429) | Empty response (1000ms wait time)', async () => {
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(429)
            .defaultReplyHeaders({ 'Retry-After': '1' });
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(200, { response: { custom_model: { id: 456 } } });
        const client = new index_1.XandrClient({
            username: 'x',
            password: 'x'
        });
        const start = Date.now();
        const obj = await client.customModel.get(0);
        const end = Date.now();
        (0, chai_1.expect)((end - start) / 1000).greaterThan(1);
        (0, chai_1.expect)(obj.id).to.equal(456);
    });
    (0, mocha_1.it)('Error (3xx - 4xx - 5xx) | Json response', async () => {
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(404, { response: { error: 'not found', error_id: 'NOTFOUND' } });
        const client = new index_1.XandrClient({
            username: 'x',
            password: 'x'
        });
        try {
            await client.customModel.get(0);
        }
        catch (error) {
            (0, chai_1.expect)(error).instanceOf(errors_1.XandrError);
            const xandrError = error;
            (0, chai_1.expect)(xandrError.status).to.equal(404);
            (0, chai_1.expect)(xandrError.error).to.equal('not found');
            (0, chai_1.expect)(xandrError.code).to.equal('NOTFOUND');
            return;
        }
        throw new Error('Expected Error in try clause');
    });
    (0, mocha_1.it)('Error (3xx - 4xx - 5xx) | Text response', async () => {
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(502, '<h1>Bad Gateway</h1>');
        const client = new index_1.XandrClient({
            username: 'x',
            password: 'x'
        });
        try {
            await client.customModel.get(0);
        }
        catch (error) {
            (0, chai_1.expect)(error).instanceOf(errors_1.XandrError);
            const xandrError = error;
            (0, chai_1.expect)(xandrError.status).to.equal(502);
            (0, chai_1.expect)(xandrError.error).to.equal('<h1>Bad Gateway</h1>');
            (0, chai_1.expect)(xandrError.code).to.equal('ERROR');
            return;
        }
        throw new Error('Expected Error in try clause');
    });
    (0, mocha_1.it)('Error (3xx - 4xx - 5xx) | Empty response', async () => {
        (0, nock_1.default)(index_1.defaultApiUrl).get('/custom-model').query(true).reply(500);
        const client = new index_1.XandrClient({
            username: 'x',
            password: 'x'
        });
        try {
            await client.customModel.get(0);
        }
        catch (error) {
            (0, chai_1.expect)(error).instanceOf(errors_1.XandrError);
            const xandrError = error;
            (0, chai_1.expect)(xandrError.status).to.equal(500);
            (0, chai_1.expect)(xandrError.error).to.equal('');
            (0, chai_1.expect)(xandrError.code).to.equal('ERROR');
            return;
        }
        throw new Error('Expected Error in try clause');
    });
});
