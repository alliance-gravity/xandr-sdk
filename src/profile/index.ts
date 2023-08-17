/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';

import type {
  ProfileGetAllResponse,
  ProfileResponse,
  ProfileFull,
  ModifyProfileParameters,
  GetProfileParameters,
  ProfileGeographyParameter,
  AddProfileParameters
} from './types';

export class XandrProfileClient {
  private readonly client: XandrClient;

  private readonly endpoint = 'profiles';

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
      const response = await this.client.execute<ProfileGetAllResponse>({
        method: 'GET',
        endpoint: this.endpoint,
        query: { start_element: profiles.length, ...params }     
      });
      profiles.push(...response.profiles);
      done = response.count === profiles.length;
    } while (!done);
    return profiles;
  }

  public async add (params: AddProfileParameters, profile: ProfileGeographyParameter): Promise<ProfileFull> {
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

  public async modify (params: ModifyProfileParameters, profile: ProfileGeographyParameter): Promise<ProfileFull> {
    const response = await this.client.execute<ProfileResponse>({
      method: 'PUT',
      headers: this.defaultHeaders,
      endpoint: this.endpoint,
      query: { ...params },
      body: profile
    });
    return response.profile;
  }

}