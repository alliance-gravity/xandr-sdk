/* eslint-disable @typescript-eslint/naming-convention */
import type { XandrClient } from '..';

import {
  ProfileGetAllResponse,
  ProfileResponse,
  ProfileFull,
  ModifyProfileParameters,
  GetProfileParameters,
  ProfileBaseResponse,
  ProfileGeographyParameter
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
        query: { start_element: profiles.length, 
          ...'advertiser_code' in params
            ? 'profiled_code' in params
              ? { profile_code: params.profile_code, advertiser_code: params.advertiser_code }
              : { advertiser_code: params.advertiser_code }
            : 'member_id' in params
                ? 'profile_id' in params
                  ? { profile_id: params.profile_id, advertiser_id: params.advertiser_id, member_id: params.member_id }
                  : { advertiser_id: params.advertiser_id, member_id: params.member_id }
        }   
      });
      profiles.push(...response['profiles']);
      done = response.count === profiles.length;
    } while (!done);
    return profiles;
  }

}