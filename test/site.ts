/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { XandrClient, defaultApiUrl } from '../src/index';
import { XandrError } from '../src/errors';
import nock from 'nock';

const intercept = process.env.ENABLE_NOCK === 'true';
let describeMessage = '(using real API)';
if (intercept)
  describeMessage = '(nock intercepted)';

const username = 'x';
const password = 'x';

const endpoint = '/site';

describe(`Site API ${describeMessage}`, () => {

  const client = new XandrClient({username, password});

  before(() => {
    if (intercept)
      nock(defaultApiUrl).post('/auth').reply(200, { response: { token: 'token' }});
  });

  after(() => {
    nock.cleanAll();
  });

  it('Add', async () => {
    if (intercept)
      nock(defaultApiUrl).post(endpoint).query(true).reply(201, { response: { site: { id: 273205, name: 'site test' }, id: 273205, count: 1, status: 'OK', start_element: 0, num_elements: 100 }});

    const response = await client.site.add(102306, {
      name: 'site test',
      supply_type: 'mobile_app'
    });

    expect(response.id).to.equal(273205);
    expect(response.site?.name).to.equal('site test');
  });

  it('Get all for publisher', async () => {
    if (intercept)
      nock(defaultApiUrl).get(endpoint).query(true).reply(200, { response: { sites: [{ id: 2411 }, { id: 2412 }], count: 2, status: 'OK', start_element: 0, num_elements: 100, id: 0 }});

    const sites = await client.site.get({ publisherId: 102306 });

    expect(sites.length).to.equal(2);
    expect(sites[0].id).to.equal(2411);
    expect(sites[1].id).to.equal(2412);
  });

  it('Get by id', async () => {
    if (intercept)
      nock(defaultApiUrl).get(endpoint).query(true).reply(200, { response: { site: { id: 273205 }, count: 1, status: 'OK', start_element: 0, num_elements: 100, id: 273205 }});

    const sites = await client.site.get({ id: 273205 });

    expect(sites.length).to.equal(1);
    expect(sites[0].id).to.equal(273205);
  });

  it('Get by idList', async () => {
    if (intercept)
      nock(defaultApiUrl).get(endpoint).query(true).reply(200, { response: { sites: [{ id: 1 }, { id: 2 }, { id: 3 }], count: 3, status: 'OK', start_element: 0, num_elements: 100, id: 0 }});

    const sites = await client.site.get({ idList: [1, 2, 3] });

    expect(sites.length).to.equal(3);
  });

  it('Modify', async () => {
    if (intercept)
      nock(defaultApiUrl).put(endpoint).query(true).reply(200, { response: { site: { id: 273205, name: 'renamed' }, id: 273205, count: 1, status: 'OK', start_element: 0, num_elements: 100 }});

    const response = await client.site.modify({ id: 273205 }, { name: 'renamed' });

    expect(response.site?.name).to.equal('renamed');
  });

  it('Delete', async () => {
    if (intercept)
      nock(defaultApiUrl).delete(endpoint).query(true).reply(200, { response: { id: 273205, count: 0, status: 'OK', start_element: 0, num_elements: 0 }});

    const response = await client.site.delete({ id: 273205, publisherId: 102306 });

    expect(response.status).to.equal('OK');
  });

  it('Get non-existing', async () => {
    if (intercept)
      nock(defaultApiUrl).get(endpoint).query(true).reply(404, { response: { error: 'site not found', error_id: 'NOTFOUND' }});

    try {
      await client.site.get({ id: 0 });
    } catch (error: unknown) {
      expect(error).instanceOf(XandrError);
      const xandrError = error as XandrError;
      expect(xandrError.status).to.equal(404);
    }
  });
});
