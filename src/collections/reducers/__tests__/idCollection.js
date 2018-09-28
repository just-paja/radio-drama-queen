import { idCollection } from '..';

describe('idCollection reducers', () => {
  it('addPayload adds payload to the list', () => {
    const state = {
      items: [],
    };
    const result = idCollection.addPayload('items')(state, {
      payload: 'foo',
    });
    expect(result.items).toContain('foo');
  });

  it('addPayload returns previous state when it already contains payload', () => {
    const state = {
      items: ['foo', 'bar'],
    };
    const result = idCollection.addPayload('items')(state, {
      payload: 'foo',
    });
    expect(result.items).toHaveLength(2);
    expect(result).toBe(state);
  });

  it('removePayload removes payload from the list', () => {
    const state = {
      items: ['foo'],
    };
    const result = idCollection.removePayload('items')(state, {
      payload: 'foo',
    });
    expect(result.items).toHaveLength(0);
  });

  it('removePayload returns previous state when it does not contain payload', () => {
    const state = {
      items: ['foo'],
    };
    const result = idCollection.removePayload('items')(state, {
      payload: 'bar',
    });
    expect(result.items).toContain('foo');
    expect(result.items).toHaveLength(1);
    expect(result).toBe(state);
  });
});
