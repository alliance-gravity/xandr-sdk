import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Sample test', () => {
  it('test #1', () => {
    const result = 0;
    expect(result).to.equal(0);
  });

  it('test #2', () => {
    const result = 1;
    expect(result).to.equal(1);
  });
});