"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.request = exports.sleep = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const errors_1 = require("./errors");
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
async function request(params, baseUrl) {
    var _a;
    const url = new URL(baseUrl);
    url.pathname = params.endpoint;
    Object.entries((_a = params.query) !== null && _a !== void 0 ? _a : {}).forEach(entry => {
        url.searchParams.append(entry[0], entry[1].toString());
    });
    const response = await (0, node_fetch_1.default)(url.toString(), {
        method: params.method,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: params.headers,
        body: params.body !== undefined
            ? JSON.stringify(params.body)
            : params.formData ? params.formData : undefined
    });
    const isJson = response.headers.get('Content-Type') === 'application/json' || response.headers.get('Content-Type') === 'application/appnexus.apd.vauxhall.v1.0+json';
    const responseBody = await response.text();
    if (response.status === 204) {
        return {};
    }
    if (response.status > 299) {
        const headers = Object.fromEntries(response.headers.entries());
        if (isJson) {
            const responseJson = JSON.parse(responseBody);
            if ('response' in responseJson)
                throw new errors_1.XandrError(responseJson.response.error, responseJson.response.error_id, response.status, headers);
        }
        throw new errors_1.XandrError(responseBody, 'ERROR', response.status, headers);
    }
    if (isJson) {
        const responseJson = JSON.parse(responseBody);
        if ('response' in responseJson)
            return responseJson.response;
        return JSON.parse(responseBody);
    }
    return {};
}
exports.request = request;
async function auth(params, baseUrl) {
    const authResponse = await request({
        method: 'POST',
        endpoint: 'auth',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Content-Type': 'application/json' },
        body: { auth: params }
    }, baseUrl);
    return authResponse.token;
}
exports.auth = auth;
