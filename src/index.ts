import { AuthParameters, RequestParameters } from './types';
import { auth, request } from './utils';
import { XandrCustomModelClient } from './custom-model';
import { XandrError } from './errors';

export const apiUrl = 'https://api.appnexus.com';

export class XandrClient {
  private creds: AuthParameters;
  private token: string = '';

  public customModel: XandrCustomModelClient = new XandrCustomModelClient(this);

  constructor(params: AuthParameters) {
    this.creds = params;
  }

  async authenticate(): Promise<void> {
    this.token = await auth(this.creds);
  }

  async execute<ExpectedResponseType>(params: RequestParameters): Promise<ExpectedResponseType> {
    try {
      if (!params.headers)
        params.headers = {}
      params.headers.Authorization = this.token;
      const resp = await request<ExpectedResponseType>(params);
      return resp;
    } catch (error) {
      if (error instanceof XandrError && error.errorId === 'NOAUTH') {
        await this.authenticate();
        return await this.execute(params);
      }
      throw error;
    }
  }
}