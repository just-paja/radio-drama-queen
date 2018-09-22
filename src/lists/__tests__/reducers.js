import { handleActions } from 'redux-actions';
import { createListReducer, createListRoutine } from '..';

describe('combined reducer', () => {
  it('adds item to the list on routine add action', () => {
    const routine = createListRoutine('TEST');
    const reducer = createListReducer(routine);
    const state = [];
    const result = reducer(state, routine.add({ uuid: 'foo' }));
    expect(result).toContainEqual({
      uuid: 'foo',
    });
  });

  it('keeps current state on routine add action with already existing identifier', () => {
    const routine = createListRoutine('TEST');
    const reducer = createListReducer(routine);
    const state = [{ uuid: 'foo' }];
    const result = reducer(state, routine.add({ uuid: 'foo' }));
    expect(result).toBe(state);
    expect(result).toHaveLength(1);
  });

  it('removes item from the list on routine remove action', () => {
    const routine = createListRoutine('TEST');
    const reducer = createListReducer(routine);
    const state = [{ uuid: 'foo' }];
    const result = reducer(state, routine.remove({ uuid: 'foo' }));
    expect(result).toEqual([]);
  });

  it('keeps current state on routine remove action with non-existent identifier', () => {
    const routine = createListRoutine('TEST');
    const reducer = createListReducer(routine);
    const state = [{ uuid: 'foo' }];
    const result = reducer(state, routine.remove({ uuid: 'bar' }));
    expect(result).toBe(state);
    expect(result).toContainEqual({
      uuid: 'foo',
    });
  });

  it('runs reducer on existing item', () => {
    const routine = createListRoutine('TEST', ['TOGGLE']);
    const itemReducer = handleActions({
      [routine.TOGGLE]: state => ({
        ...state,
        visible: !state.visible,
      }),
    }, { visible: false });
    const reducer = createListReducer(routine, itemReducer);
    const state = [{ uuid: 'foo', visible: false }];
    const result = reducer(state, routine.toggle('foo'));
    expect(result).toContainEqual({
      uuid: 'foo',
      visible: true,
    });
  });

  it('keeps current state on routine action on non-existent item', () => {
    const routine = createListRoutine('TEST', ['TOGGLE']);
    const itemReducer = handleActions({
      [routine.TOGGLE]: state => ({
        ...state,
        visible: !state.visible,
      }),
    }, { visible: false });
    const reducer = createListReducer(routine, itemReducer);
    const state = [{ uuid: 'foo', visible: false }];
    const result = reducer(state, routine.toggle('bar'));
    expect(result).toBe(state);
    expect(result).toContainEqual({
      uuid: 'foo',
      visible: false,
    });
  });
});
