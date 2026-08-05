/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';


import type {
  Currency,
  GetCurrencyParameters,
  CurrencyResponse,
  GetCurrencyRatePerUsdParameters,
  CurrencyRatePerUsdResponse
} from './types';

export class XandrCurrencyClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'currency';

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async get (params: GetCurrencyParameters): Promise<Currency[]> {
    const currencies: Currency[] = [];
    let done = false;
    do {
      const response = await this.client.execute<CurrencyResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: Object.fromEntries(Object.entries(params)
          .filter(([, value]) => value !== undefined)
          .map(([key, value]) => [key, String(value)])
        )
      });
      if (response.currencies) {
        currencies.push(...response.currencies);
      } else if (response.currency) {
        currencies.push(response.currency);
      }
      done = response.count === currencies.length;
    } while (!done);
    return currencies;
  }

  public async getRatePerUsd (params: GetCurrencyRatePerUsdParameters): Promise<CurrencyRatePerUsdResponse> {
    const response = await this.client.execute<CurrencyResponse>({
      method: 'GET',
      endpoint: this.endpoint,
      query: {
        code: params.code,
        ymd: params.day instanceof Date ? params.day.toISOString().split('T')[0] : params.day,
        show_rate: 'true'
      }
    });
    if (response.currency) {
      return { asOf: response.currency.as_of ?? '', ratePerUsd: Number(response.currency.rate_per_usd) };
    }
    throw new Error('Error while fetching currency');
  }

}