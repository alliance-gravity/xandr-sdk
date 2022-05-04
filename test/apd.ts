/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { XandrClient, defaultApiUrl } from '../src/index';
import nock from 'nock';

const intercept = process.env.ENABLE_NOCK === 'true';
let describeMessage = '(using real API)';
if (intercept)
  describeMessage = '(nock intercepted)';

const username = 'x';
const password = 'x';
const memberId = 1;

const endpoint = '/apd-api';

describe(`APD API ${describeMessage}`, () => {

  const client = new XandrClient({username, password});

  before(() => {
    if (intercept)
      nock(defaultApiUrl).post('/auth').reply(200, { response: { token: 'token' }});
  });

  after(() => {
    nock.cleanAll();
  });

  it('Upload', async () => {
    if (intercept)
      nock(defaultApiUrl).post(`${endpoint}/members/${memberId}/uploads`).reply(200, { response: { id: 123 }});
    

    const uploadId = await client.apd.upload({
      memberId,
      uploadData: [{
        url: 'https://www.appnexus.com',
        partial: false,
        segment: { segId: 1 },
        add: true
      }, {
        location: '1.1.1.1,2.2.2.2',
        add: false,
        segment: { segId: 2 }
      }, {
        url: 'http://www.lequipe.fr/football',
        partial: true,
        segment: { segId: 3, segTtl: 3600 },
        add: true
      }, {
        location: '8FW4V75V+HJ',
        add: true,
        segment: { segId: 10 }
      }, {
        location: 'FR:IF',
        add: true,
        segment: { segId: 123 }
      }, {
        location: '91540-1234',
        add: true,
        segment: { segId: 123, segVal: 1000 }
      }, {
        location: '12346789-abcd-efab-cdef-000000000000',
        add: true,
        segment: { segId: 4321 }
      }]
    });

    expect(uploadId).to.equal(123);
  });
});