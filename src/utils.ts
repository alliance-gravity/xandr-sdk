import fetch from 'node-fetch';
import type { RequestParameters, XandrResponse, XandrGeneralError, AuthParameters, AuthResponse } from './types';
import { XandrError } from './errors';

export async function sleep (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function request<ExpectedResponseType> (params: RequestParameters, baseUrl: string, raw: boolean): Promise<ExpectedResponseType> {
  const url = new URL(baseUrl);
  url.pathname = params.endpoint;
  Object.entries(params.query ?? {}).forEach(entry => {
    url.searchParams.append(entry[0], entry[1].toString());
  });
  const response = await fetch(url.toString(), {
    method: params.method,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: {'Content-Type': 'application/json', ...params.headers},
    body: params.body !== undefined ?
      raw ? String(params.body) : JSON.stringify(params.body) 
      : undefined
  });
  if (response.status > 299) {
    const headers = Object.fromEntries(response.headers.entries());
    try {
      const responseJson = await response.json() as XandrResponse<XandrGeneralError>;
      throw new XandrError(responseJson.response.error, responseJson.response.error_id, response.status, headers);
    } catch (error: unknown) {
      if (error instanceof XandrError)
        throw error;
      const responseContent = await response.text();
      throw new XandrError(responseContent, 'ERROR', response.status, headers);
    }
  }
  const responseJson = await response.json() as XandrResponse<ExpectedResponseType>;
  return responseJson.response;
}

export async function auth (params: AuthParameters, baseUrl: string): Promise<string> {
  const authResponse = await request<AuthResponse>({
    method: 'POST',
    endpoint: 'auth',
    body: { auth: params }
  }, baseUrl, false);
  return authResponse.token;
}
