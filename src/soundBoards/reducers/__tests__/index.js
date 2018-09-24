import reducer from '..';

describe('combined sound board reducer', () => {
  it('provides list reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('list');
  });
});
