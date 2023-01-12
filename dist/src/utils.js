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
    var _a, _b;
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
    const contentType = (_b = response.headers.get('Content-Type')) === null || _b === void 0 ? void 0 : _b.split(';')[0].trim();
    const [contentTypeGroup, contentTypeSub] = contentType !== undefined ? contentType.split('/') : ['', ''];
    const isJson = contentTypeGroup === 'application' && contentTypeSub.split('+').includes('json');
    const responseBody = await response.text();
    if (response.status === 204) {
        return {};
    }
    const headers = Object.fromEntries(response.headers.entries());
    if (response.status > 299) {
        if (isJson) {
            const responseJson = JSON.parse(responseBody);
            if ('response' in responseJson)
                throw new errors_1.XandrError(responseJson.response.error, responseJson.response.error_id, response.status, headers);
        }
        throw new errors_1.XandrError(responseBody, 'ERROR', response.status, headers);
    }
    if (isJson) {
        const responseJson = JSON.parse(responseBody);
        if ('response' in responseJson) {
            // in case of HTTP 200 when error occured ...
            const noErrorCheck = responseJson.response;
            if ('error' in noErrorCheck && 'error_id' in noErrorCheck) {
                throw new errors_1.XandrError(noErrorCheck.error, noErrorCheck.error_id, response.status, headers);
            }
            return responseJson.response;
        }
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
