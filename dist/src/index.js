"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrClient = exports.XandrError = exports.sanitizeUrlFormat = exports.defaultApiUrl = void 0;
const utils_1 = require("./utils");
const custom_model_1 = require("./custom-model");
const apd_1 = require("./apd");
const line_item_1 = require("./line-item");
const errors_1 = require("./errors");
Object.defineProperty(exports, "XandrError", { enumerable: true, get: function () { return errors_1.XandrError; } });
const segment_1 = require("./segment");
const segment_billing_category_1 = require("./segment-billing-category");
const placement_1 = require("./placement");
const advertiser_1 = require("./advertiser");
const publisher_1 = require("./publisher");
exports.defaultApiUrl = 'https://api.appnexus.com';
var utils_2 = require("./apd/utils");
Object.defineProperty(exports, "sanitizeUrlFormat", { enumerable: true, get: function () { return utils_2.sanitizeUrlFormat; } });
class XandrClient {
    constructor(params, apiUrl = exports.defaultApiUrl) {
        this.customModel = new custom_model_1.XandrCustomModelClient(this);
        this.advertiser = new advertiser_1.XandrAdvertiserClient(this);
        this.publisher = new publisher_1.XandrPublisherClient(this);
        this.apd = new apd_1.XandrAPDClient(this);
        this.lineItem = new line_item_1.XandrLineItemClient(this);
        this.segment = new segment_1.XandrSegmentClient(this);
        this.segmentBillingCategory = new segment_billing_category_1.XandrSegmentBillingCategoryClient(this);
        this.placement = new placement_1.XandrPlacementClient(this);
        this.token = null;
        this.creds = params;
        this.apiUrl = apiUrl;
    }
    getToken() {
        return this.token;
    }
    async execute(params) {
        var _a;
        if (this.token === null)
            await this.authenticate();
        try {
            if (!params.headers)
                params.headers = {};
            params.headers.Authorization = (_a = this.token) !== null && _a !== void 0 ? _a : '';
            const resp = await (0, utils_1.request)(params, this.apiUrl);
            return resp;
        }
        catch (error) {
            if (error instanceof errors_1.XandrError) {
                if (error.code === 'NOAUTH') {
                    await this.authenticate();
                    const resp = await this.execute(params);
                    return resp;
                }
                if (error.status === 429) {
                    const secs = error.headers['Retry-After'] || error.headers['retry-after'];
                    await (0, utils_1.sleep)(secs ? Number(secs) * 1000 : 0);
                    const resp = await this.execute(params);
                    return resp;
                }
            }
            throw error;
        }
    }
    async authenticate() {
        this.token = await (0, utils_1.auth)(this.creds, this.apiUrl);
    }
}
exports.XandrClient = XandrClient;
