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
  describeMessage = ' (nock intercepted)';

const username = 'x';
const password = 'x';

const endpoint = '/line-item';

describe(`Line Item API ${describeMessage}`, () => {

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
      nock(defaultApiUrl).post(endpoint).query(true).reply(201, { response: { 'line-item': { id: 123 } }});
    

    const lineItem = await client.lineItem.add(1, {
      id: 123,
      name: 'lineItemTest',
      revenue_value: 100,
      ad_types: ['banner']
    });

    expect(lineItem.id).to.equal(123);
  });

  it('Get existing', async () => {
    if (intercept)
      nock(defaultApiUrl).get(endpoint).query(true).reply(200, { response: { 'line-items': [{ id: 123 }, { id: 456 }]}});

    const lineItems = await client.lineItem.get({
      idList: [123, 456]
    });

    expect(lineItems.length).to.equal(2);
    expect(lineItems[0].id).to.equal(123);
    expect(lineItems[1].id).to.equal(456);
  });

  it('Get non-existing', async () => {
    if (intercept)
      nock(defaultApiUrl).get(endpoint).query(true).reply(404, { response: { error: 'line item not found', error_id: 'NOTFOUND' }});

    try {
      await client.lineItem.get({
        idList: [0]
      });
    } catch (error: unknown) {
      expect(error).instanceOf(XandrError);
      const xandrError = error as XandrError;
      expect(xandrError.status).to.equal(404);
    }
  });
});