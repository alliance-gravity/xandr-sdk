/* eslint-disable @typescript-eslint/naming-convention */
import type { CommonResponse } from '../xandr-types';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  description: string | null;
  position: string;
  last_modified: string;
  rate_per_usd?: string;
  as_of?: string;
}

export interface GetCurrencyParameters {
  show_rate: boolean;
  code?: string;
  ymd?: string;
}

export type CurrencyResponse = CommonResponse & {
  currency?: Currency;
  currencies?: Currency[];
};

export interface GetCurrencyRatePerUsdParameters {
  day: Date | string;
  code: string;
}

export interface CurrencyRatePerUsdResponse {
  asOf: string;
  ratePerUsd: number;
}
