/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { describe, it } from 'mocha';
import { expect } from 'chai';
import { XandrClient, defaultApiUrl } from '../src/index';
//import { XandrError } from '../src/errors';
import nock from 'nock';

describe('HTTP return codes handling', () => {
  it('200 Success', async () => {

    nock(defaultApiUrl).post('/auth').reply(200, { response: { token: '123' }});
    nock(defaultApiUrl).get('/custom-model').query(true).reply(200, { response: {custom_model: {} }});
    
    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    const obj = await client.customModel.get(0);

    expect(obj).to.be.empty;
  });

  it('404 Not Found', () => {

    nock(defaultApiUrl).post('/auth').reply(200, { response: { token: '123' }});
    nock(defaultApiUrl).get('/custom-model').query(true).reply(404, {response: {error: '', error_id: ''}});
    
    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    expect(async () => {
      await client.customModel.get(0);
    }).to.not.throw();
  });
});