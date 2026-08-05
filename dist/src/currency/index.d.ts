import type { XandrClient } from '..';
import type { Currency, GetCurrencyParameters, GetCurrencyRatePerUsdParameters, CurrencyRatePerUsdResponse } from './types';
export declare class XandrCurrencyClient {
    private readonly client;
    private readonly endpoint;
    constructor(client: XandrClient);
    get(params: GetCurrencyParameters): Promise<Currency[]>;
    getRatePerUsd(params: GetCurrencyRatePerUsdParameters): Promise<CurrencyRatePerUsdResponse>;
}
