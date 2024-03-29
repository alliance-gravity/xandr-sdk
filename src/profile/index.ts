/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';

import type {
  ProfileGetResponse,
  ProfileFull,
  ModifyProfileParameters,
  GetProfileParameters,
  ProfileParameter,
  AddProfileParameters,
  ProfileBaseResponse,
  ProfileResponse
} from './types';

export class XandrProfileClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'profile';

  private readonly defaultHeaders = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    'Content-Type': 'application/json'
  };

  public constructor (client: XandrClient) {
    this.client = client;
  }

  public async get (params: GetProfileParameters): Promise<ProfileFull[]> {
    const profiles: ProfileFull[] = [];
    let done = false;
    do {
      const response = await this.client.execute<ProfileGetResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { start_element: profiles.length, ...params }     
      });
      if (response.profiles) {
        profiles.push(...response.profiles);
      } else if (response.profile) {
        profiles.push(response.profile);
      }
      done = response.count === profiles.length;
    } while (!done);
    return profiles;
  }

  public async add (params: AddProfileParameters, profile: ProfileParameter): Promise<ProfileFull> {
    const response = await this.client.execute<ProfileResponse>({
      method: 'POST',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      query: { ...params },
      body: profile
    });
    return response.profile;
  }

  public async modify (params: ModifyProfileParameters, profile: ProfileParameter): Promise<ProfileBaseResponse> {
    const response = await this.client.execute<ProfileBaseResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      query: { ...params },
      body: profile
    });
    return response;
  }

}