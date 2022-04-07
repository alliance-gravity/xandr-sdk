import { AuthParameters } from './types';
import { auth } from './utils';
import { XandrCustomModelClient } from './custom-model';

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
    this.customModel.authenticate(this.token);
  }
}