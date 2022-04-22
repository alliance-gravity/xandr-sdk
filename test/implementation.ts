/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { XandrClient, defaultApiUrl } from '../src/index';
import { XandrError } from '../src/errors';
import nock from 'nock';

describe('Authentication', () => {

  after(() => {
    nock.cleanAll();
  });

  it('First Authentication', async () => {
    nock(defaultApiUrl).post('/auth').reply(200, { response: { token: 'first token' }});
    nock(defaultApiUrl).get('/custom-model').query(true).reply(200, { response: {}});

    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    expect(client.getToken()).to.be.null;

    await client.customModel.get(0);

    expect(client.getToken()).to.equal('first token');
  });

  it('Expired token re-Authentication', async () => {
    nock(defaultApiUrl).post('/auth').reply(200, { response: { token: 'first token' }});
    nock(defaultApiUrl).get('/custom-model').query(true).reply(200, { response: {}});

    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    expect(client.getToken()).to.be.null;

    await client.customModel.get(0);

    expect(client.getToken()).to.equal('first token');

    nock(defaultApiUrl).get('/custom-model').query(true).reply(401, { response: { error: 'no auth', error_id: 'NOAUTH' }});
    nock(defaultApiUrl).post('/auth').reply(200, { response: { token: 'second token' }});
    nock(defaultApiUrl).get('/custom-model').query(true).reply(200, { response: {}});

    await client.customModel.get(0);

    expect(client.getToken()).to.equal('second token');
  });

  it('Invalid Authentication', async () => {
    nock(defaultApiUrl).post('/auth').reply(401, { response: { error: 'No match...', error_id: 'UNAUTH' }});

    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    try {
      await client.customModel.get(0);
    } catch (error: unknown) {
      expect(error).instanceOf(XandrError);
      const xandrError = error as XandrError;
      expect(xandrError.status).to.equal(401);
      expect(xandrError.error).to.equal('No match...');
      expect(xandrError.code).to.equals('UNAUTH');
      return;
    }

    throw new Error('Expected Error in try clause');
  });

  it('Token usage in requests', async () => {
    nock(defaultApiUrl).post('/auth').reply(200, { response: { token: 'token12345' }});
    nock(defaultApiUrl, {
      reqheaders: { 'Authorization': 'token12345' }
    }).get('/custom-model').query(true).reply(200, { response: { custom_model: {}}});

    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    await client.customModel.get(0);
  });
});


describe('HTTP return codes handling', () => {

  before(() => {
    nock(defaultApiUrl).post('/auth').reply(200, { response: { token: 'token' }}).persist();
  });

  after(() => {
    nock.cleanAll();
  });

  it('Success (2xx)', async () => {
    nock(defaultApiUrl).get('/custom-model').query(true).reply(200, { response: { custom_model: { id: 123 } }});
    
    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    const obj = await client.customModel.get(0);

    expect(Object.keys(obj)).to.include('id');
    expect(obj.id).to.equal(123);
  });

  it('No Content (204)', async () => {
    nock(defaultApiUrl).delete('/custom-model').query(true).reply(204);
    
    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    await client.customModel.delete(0);
  });

  it('Rate limited (429) | With response (1000ms wait time)', async () => {
    nock(defaultApiUrl).get('/custom-model').query(true).reply(429, { response: { error: 'You have...', error_id: 'SYSTEM'} })
      .defaultReplyHeaders({'Retry-After': '1'});
    nock(defaultApiUrl).get('/custom-model').query(true).reply(200, { response: { custom_model: { id: 123 }}});

    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    const start = Date.now();
    const obj = await client.customModel.get(0);
    const end = Date.now();
    expect((end - start) / 1000).greaterThan(1);
    expect(obj.id).to.equal(123);
  });

  it('Rate limited (429) | Empty response (1000ms wait time)', async () => {
    nock(defaultApiUrl).get('/custom-model').query(true).reply(429)
      .defaultReplyHeaders({'Retry-After': '1'});
    nock(defaultApiUrl).get('/custom-model').query(true).reply(200, { response: { custom_model: { id: 456 }}});

    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    const start = Date.now();
    const obj = await client.customModel.get(0);
    const end = Date.now();
    expect((end - start) / 1000).greaterThan(1);
    expect(obj.id).to.equal(456);
  });

  it('Error (3xx - 4xx - 5xx) | Json response', async () => {
    nock(defaultApiUrl).get('/custom-model').query(true).reply(404, { response: { error: 'not found', error_id: 'NOTFOUND' }});
    
    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    try {
      await client.customModel.get(0);
    } catch (error: unknown) {
      expect(error).instanceOf(XandrError);
      const xandrError = error as XandrError;
      expect(xandrError.status).to.equal(404);
      expect(xandrError.error).to.equal('not found');
      expect(xandrError.code).to.equal('NOTFOUND');
      return;
    }

    throw new Error('Expected Error in try clause');
  });

  it('Error (3xx - 4xx - 5xx) | Text response', async () => {
    nock(defaultApiUrl).get('/custom-model').query(true).reply(502, '<h1>Bad Gateway</h1>');

    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    try {
      await client.customModel.get(0);
    } catch (error: unknown) {
      expect(error).instanceOf(XandrError);
      const xandrError = error as XandrError;
      expect(xandrError.status).to.equal(502);
      expect(xandrError.error).to.equal('<h1>Bad Gateway</h1>');
      expect(xandrError.code).to.equal('ERROR');
      return;
    }

    throw new Error('Expected Error in try clause');
  });

  it('Error (3xx - 4xx - 5xx) | Empty response', async () => {
    nock(defaultApiUrl).get('/custom-model').query(true).reply(500);

    const client = new XandrClient({
      username: 'x',
      password: 'x'
    });

    try {
      await client.customModel.get(0);
    } catch (error: unknown) {
      expect(error).instanceOf(XandrError);
      const xandrError = error as XandrError;
      expect(xandrError.status).to.equal(500);
      expect(xandrError.error).to.equal('');
      expect(xandrError.code).to.equal('ERROR');
      return;
    }

    throw new Error('Expected Error in try clause');
  });
});