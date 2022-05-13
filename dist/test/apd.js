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
const nock_1 = __importDefault(require("nock"));
const intercept = process.env.ENABLE_NOCK === 'true';
let describeMessage = '(using real API)';
if (intercept)
    describeMessage = '(nock intercepted)';
const username = 'x';
const password = 'x';
const memberId = 1;
const endpoint = '/apd-api';
(0, mocha_1.describe)(`APD API ${describeMessage}`, () => {
    const client = new index_1.XandrClient({ username, password });
    (0, mocha_1.before)(() => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).post('/auth').reply(200, { response: { token: 'token' } });
    });
    (0, mocha_1.after)(() => {
        nock_1.default.cleanAll();
    });
    (0, mocha_1.it)('Upload', async () => {
        if (intercept)
            (0, nock_1.default)(index_1.defaultApiUrl).post(`${endpoint}/members/${memberId}/uploads`).reply(200, { response: { id: 123 } });
        const uploadId = await client.apd.upload({
            memberId,
            uploadData: [{
                    url: 'https://www.appnexus.com',
                    partial: false,
                    segment: { segId: 1 },
                    add: true
                }, {
                    location: '1.1.1.1,2.2.2.2',
                    add: false,
                    segment: { segId: 2 }
                }, {
                    url: 'http://www.lequipe.fr/football',
                    partial: true,
                    segment: { segId: 3, segTtl: 3600 },
                    add: true
                }, {
                    location: '8FW4V75V+HJ',
                    add: true,
                    segment: { segId: 10 }
                }, {
                    location: 'FR:IF',
                    add: true,
                    segment: { segId: 123 }
                }, {
                    location: '91540-1234',
                    add: true,
                    segment: { segId: 123, segVal: 1000 }
                }, {
                    location: '12346789-abcd-efab-cdef-000000000000',
                    add: true,
                    segment: { segId: 4321 }
                }]
        });
        (0, chai_1.expect)(uploadId).to.equal(123);
    });
});
