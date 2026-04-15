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
const endpoint = '/site';
(0, mocha_1.describe)(`Site API ${describeMessage}`, () => {
    const client = new index_1.XandrClient({ username, password });
    (0, mocha_1.before)(() => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).post('/auth').reply(200, { response: { token: 'token' } });
    });
    (0, mocha_1.after)(() => {
        nock_1.default.cleanAll();
    });
    (0, mocha_1.it)('Add', async () => {
        var _a;
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).post(endpoint).query(true).reply(201, { response: { site: { id: 273205, name: 'site test' }, id: 273205, count: 1, status: 'OK', start_element: 0, num_elements: 100 } });
        const response = await client.site.add(102306, {
            name: 'site test',
            supply_type: 'mobile_app'
        });
        (0, chai_1.expect)(response.id).to.equal(273205);
        (0, chai_1.expect)((_a = response.site) === null || _a === void 0 ? void 0 : _a.name).to.equal('site test');
    });
    (0, mocha_1.it)('Get all for publisher', async () => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).get(endpoint).query(true).reply(200, { response: { sites: [{ id: 2411 }, { id: 2412 }], count: 2, status: 'OK', start_element: 0, num_elements: 100, id: 0 } });
        const sites = await client.site.get({ publisherId: 102306 });
        (0, chai_1.expect)(sites.length).to.equal(2);
        (0, chai_1.expect)(sites[0].id).to.equal(2411);
        (0, chai_1.expect)(sites[1].id).to.equal(2412);
    });
    (0, mocha_1.it)('Get by id', async () => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).get(endpoint).query(true).reply(200, { response: { site: { id: 273205 }, count: 1, status: 'OK', start_element: 0, num_elements: 100, id: 273205 } });
        const sites = await client.site.get({ id: 273205 });
        (0, chai_1.expect)(sites.length).to.equal(1);
        (0, chai_1.expect)(sites[0].id).to.equal(273205);
    });
    (0, mocha_1.it)('Get by idList', async () => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).get(endpoint).query(true).reply(200, { response: { sites: [{ id: 1 }, { id: 2 }, { id: 3 }], count: 3, status: 'OK', start_element: 0, num_elements: 100, id: 0 } });
        const sites = await client.site.get({ idList: [1, 2, 3] });
        (0, chai_1.expect)(sites.length).to.equal(3);
    });
    (0, mocha_1.it)('Modify', async () => {
        var _a;
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).put(endpoint).query(true).reply(200, { response: { site: { id: 273205, name: 'renamed' }, id: 273205, count: 1, status: 'OK', start_element: 0, num_elements: 100 } });
        const response = await client.site.modify({ id: 273205 }, { name: 'renamed' });
        (0, chai_1.expect)((_a = response.site) === null || _a === void 0 ? void 0 : _a.name).to.equal('renamed');
    });
    (0, mocha_1.it)('Delete', async () => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).delete(endpoint).query(true).reply(200, { response: { id: 273205, count: 0, status: 'OK', start_element: 0, num_elements: 0 } });
        const response = await client.site.delete({ id: 273205, publisherId: 102306 });
        (0, chai_1.expect)(response.status).to.equal('OK');
    });
    (0, mocha_1.it)('Get non-existing', async () => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).get(endpoint).query(true).reply(404, { response: { error: 'site not found', error_id: 'NOTFOUND' } });
        try {
            await client.site.get({ id: 0 });
        }
        catch (error) {
            (0, chai_1.expect)(error).instanceOf(errors_1.XandrError);
            const xandrError = error;
            (0, chai_1.expect)(xandrError.status).to.equal(404);
        }
    });
});
