"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XandrCurrencyClient = void 0;
class XandrCurrencyClient {
    constructor(client) {
        this.endpoint = 'currency';
        this.client = client;
    }
    async get(params) {
        const currencies = [];
        let done = false;
        do {
            const response = await this.client.execute({
                method: 'GET',
                endpoint: this.endpoint,
                query: Object.fromEntries(Object.entries(params)
                    .filter(([, value]) => value !== undefined)
                    .map(([key, value]) => [key, String(value)]))
            });
            if (response.currencies) {
                currencies.push(...response.currencies);
            }
            else if (response.currency) {
                currencies.push(response.currency);
            }
            done = response.count === currencies.length;
        } while (!done);
        return currencies;
    }
    async getRatePerUsd(params) {
        var _a;
        const response = await this.client.execute({
            method: 'GET',
            endpoint: this.endpoint,
            query: {
                code: params.code,
                ymd: params.day instanceof Date ? params.day.toISOString().split('T')[0] : params.day,
                show_rate: 'true'
            }
        });
        if (response.currency) {
            return { asOf: (_a = response.currency.as_of) !== null && _a !== void 0 ? _a : '', ratePerUsd: Number(response.currency.rate_per_usd) };
        }
        throw new Error('Error while fetching currency');
    }
}
exports.XandrCurrencyClient = XandrCurrencyClient;
