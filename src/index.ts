import type { AuthParameters, RequestParameters } from './types';
import { auth, request } from './utils';
import { XandrCustomModelClient } from './custom-model';
import { XandrError } from './errors';

export const apiUrl = 'https://api.appnexus.com';

export class XandrClient {
  public customModel: XandrCustomModelClient = new XandrCustomModelClient(this);

  private readonly creds: AuthParameters;

  private token = '';

  public constructor (params: AuthParameters) {
    this.creds = params;
  }

  public async authenticate (): Promise<void> {
    this.token = await auth(this.creds);
  }

  public async execute<ExpectedResponseType>(params: RequestParameters): Promise<ExpectedResponseType> {
    try {
      if (!params.headers)
        params.headers = {};
      params.headers.Authorization = this.token;
      const resp = await request<ExpectedResponseType>(params);
      return resp;
    } catch (error: unknown) {
      if (error instanceof XandrError && error.errorId === 'NOAUTH') {
        await this.authenticate();
        return await this.execute(params);
      }
      throw error;
    }
  }
}