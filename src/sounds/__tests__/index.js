import * as barrel from '..';

describe('sounds module barrel file', () => {
  it('provides AudioManager', () => {
    expect(barrel).toHaveProperty('AudioManager');
  });
})
