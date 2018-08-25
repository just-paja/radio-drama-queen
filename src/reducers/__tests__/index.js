import reducer from '..';

describe('combined reducer', () => {
  it('provides categoryGrid reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('categoryGrid');
  });

  it('provides categoryList reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('categoryList');
  });

  it('provides form reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('form');
  });

  it('provides libraryConfig reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('libraryConfig');
  });

  it('provides notifications reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('notifications');
  });

  it('provides soundList reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('soundList');
  });

  it('provides ui reducer', () => {
    expect(reducer(undefined, {})).toHaveProperty('ui');
  });
});
