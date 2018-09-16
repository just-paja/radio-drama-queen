import reducer from '..';

describe('combined reducer', () => {
  it('provides grid reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('grid');
  });

  it('provides list reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('list');
  });
});
