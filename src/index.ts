import type { AuthParameters, RequestParameters } from './types';
import { auth, request, sleep } from './utils';
import { XandrCustomModelClient } from './custom-model';
import { XandrError } from './errors';

export const defaultApiUrl = 'https://api.appnexus.com';

export class XandrClient {
  public customModel: XandrCustomModelClient = new XandrCustomModelClient(this);

  private readonly creds: AuthParameters;

  private readonly apiUrl: string;

  private token: string | null = null;

  public constructor (params: AuthParameters, apiUrl: string = defaultApiUrl) {
    this.creds = params;
    this.apiUrl = apiUrl;
  }

  public async execute<ExpectedResponseType>(params: RequestParameters): Promise<ExpectedResponseType> {
    if (this.token === null)
      await this.authenticate();
    try {
      if (!params.headers)
        params.headers = {};
      params.headers.Authorization = this.token ?? '';
      const resp = await request<ExpectedResponseType>(params, this.apiUrl);
      return resp;
    } catch (error: unknown) {
      if (error instanceof XandrError) {
        if (error.code === 'NOAUTH') {
          await this.authenticate();
          const resp = await this.execute<ExpectedResponseType>(params);
          return resp;
        }
        if (error.status === 429) {
          const secs = error.headers['Retry-After'];
          await sleep(secs ? Number(secs) * 1000 : 0);
          const resp =  await this.execute<ExpectedResponseType>(params);
          return resp;
        }
      }
      throw error;
    }
  }

  private async authenticate (): Promise<void> {
    this.token = await auth(this.creds, this.apiUrl);
  }
}