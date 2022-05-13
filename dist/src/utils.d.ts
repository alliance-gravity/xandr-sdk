import type { RequestParameters, AuthParameters } from './types';
export declare function sleep(ms: number): Promise<void>;
export declare function request<ExpectedResponseType>(params: RequestParameters, baseUrl: string): Promise<ExpectedResponseType>;
export declare function auth(params: AuthParameters, baseUrl: string): Promise<string>;
