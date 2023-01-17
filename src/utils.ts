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
  const contentType = response.headers.get('Content-Type')?.split(';')[0].trim();
  const [contentTypeGroup, contentTypeSub] = contentType !== undefined ? contentType.split('/') : ['', ''];
  const isJson = contentTypeGroup === 'application' && contentTypeSub.split('+').includes('json');
  const responseBody = await response.text();
  if (response.status === 204 || responseBody.length === 0) {
    return {} as ExpectedResponseType;
  }
  const headers = Object.fromEntries(response.headers.entries());
  if (response.status > 299) {
    if (isJson) {
      const responseJson = JSON.parse(responseBody) as XandrResponse<XandrGeneralError>;
      if ('response' in responseJson)
        throw new XandrError(responseJson.response.error, responseJson.response.error_id, response.status, headers);
    }
    throw new XandrError(responseBody, 'ERROR', response.status, headers);
  }
  if (isJson) {
    const responseJson = JSON.parse(responseBody) as XandrResponse<ExpectedResponseType>;
    if ('response' in responseJson) {
      // in case of HTTP 200 when error occured ...
      const noErrorCheck = responseJson.response as Record<string, unknown>;
      if ('error' in noErrorCheck && 'error_id' in noErrorCheck) {
        throw new XandrError(noErrorCheck.error as string, noErrorCheck.error_id as string, response.status, headers);
      }
      return responseJson.response;
    }
    return JSON.parse(responseBody) as ExpectedResponseType;
  }
  return {} as ExpectedResponseType;
}

export async function auth (params: AuthParameters, baseUrl: string): Promise<string> {
  const authResponse = await request<AuthResponse>({
    method: 'POST',
    endpoint: 'auth',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    headers: { 'Content-Type': 'application/json' },
    body: { auth: params }
  }, baseUrl);
  return authResponse.token;
}
