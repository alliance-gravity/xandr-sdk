import { describe, it } from 'mocha';
import { expect } from 'chai';
import { XandrClient } from '../src/index';

describe('test', () => {
  it('', () => {
    
    new XandrClient({
      username: 'x',
      password: 'x'
    });

    expect(0).to.equal(0);
  });
});