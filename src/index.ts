import { AuthParameters } from './types';
import { auth } from './utils';

export const apiUrl = 'https://api.appnexus.com';

class XandrClient {
  private creds: AuthParameters;
  private token: string = '';

  constructor(params: AuthParameters) {
    this.creds = params;
  }

  async authenticate() {
    this.token = await auth(this.creds);
  }
}