import fetch from 'node-fetch';
import type { RequestParameters, XandrResponse, XandrGeneralError, AuthParameters, AuthResponse } from './types';
import { XandrError } from './errors';

export async function sleep (ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function request<ExpectedResponseType> (params: RequestParameters, baseUrl: string): Promise<ExpectedResponseType> {
  const url = new URL(baseUrl);
  url.pathname = params.endpoint;
  Object.entries(params.query ?? {}).forEach(entry => {
    url.searchParams.append(entry[0], entry[1].toString());
  });
  const response = await fetch(url.toString(), {
    method: params.method,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: params.headers,
    body: params.body !== undefined
      ? JSON.stringify(params.body) 
      : params.formData ? params.formData : undefined
  });
  const isJson = response.headers.get('Content-Type') === 'application/json';
  const responseBody = await response.text();
  if (response.status === 204) {
    return {} as ExpectedResponseType;
  }
  if (response.status > 299) {
    const headers = Object.fromEntries(response.headers.entries());
    if (isJson) {
      const responseJson = JSON.parse(responseBody) as XandrResponse<XandrGeneralError>;
      throw new XandrError(responseJson.response.error, responseJson.response.error_id, response.status, headers);
    }
    throw new XandrError(responseBody, 'ERROR', response.status, headers);
  }
  if (isJson) {
    const responseJson = JSON.parse(responseBody) as XandrResponse<ExpectedResponseType>;
    return responseJson.response;
  }
  return {} as ExpectedResponseType;
}

export async function auth (params: AuthParameters, baseUrl: string): Promise<string> {
  const authResponse = await request<AuthResponse>({
    method: 'POST',
    endpoint: 'auth',
    body: { auth: params }
  }, baseUrl);
  return authResponse.token;
}
