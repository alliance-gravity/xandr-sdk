import fetch from 'node-fetch';
import { RequestParameters, XandrResponse, XandrGeneralError, AuthParameters, AuthResponse } from './types';
import { XandrError } from './errors';
import { apiUrl } from './index';

export async function request<ExpectedResponseType>(params: RequestParameters): Promise<ExpectedResponseType>  {
  const response = await fetch(
    `${apiUrl}/${params.endpoint}`, {
      method: params.method,
      headers: params.headers ? params.headers : undefined,
      body: params.body ? JSON.stringify(params.body) : undefined
    }
  );
  if (response.status > 299) {
    const responseJson = await response.json() as XandrResponse<XandrGeneralError>;
    throw new XandrError(responseJson.response.error_id, responseJson.response.error);
  }
  const responseJson = await response.json() as XandrResponse<ExpectedResponseType>;
  return responseJson.response;
};

export async function auth(params: AuthParameters): Promise<string> {
  const authResponse = await request<AuthResponse>({
    method: 'POST',
    endpoint: 'auth',
    body: { auth: params}
  });
  return authResponse.token;
}
