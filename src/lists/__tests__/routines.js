import { createListRoutine } from '..';

describe('list routine', () => {
  it('provides default list identifier', () => {
    const routine = createListRoutine('TEST');
    expect(routine).toHaveProperty('listIdentifier', 'uuid');
  });

  it('provides default a defined list identifier', () => {
    const routine = createListRoutine('TEST', [], 'name');
    expect(routine).toHaveProperty('listIdentifier', 'name');
  });

  it('provides list actions', () => {
    const routine = createListRoutine('TEST', ['FOO', 'BAR']);
    expect(routine).toHaveProperty('listActions', ['TEST/FOO', 'TEST/BAR']);
  });

  it('provides add action name', () => {
    const routine = createListRoutine('TEST');
    expect(routine).toHaveProperty('ADD', 'TEST/ADD');
  });

  it('add action has add type', () => {
    const routine = createListRoutine('TEST');
    expect(routine.add('foo')).toHaveProperty('type', 'TEST/ADD');
  });

  it('add action has a payload', () => {
    const routine = createListRoutine('TEST');
    expect(routine.add('foo')).toHaveProperty('payload', 'foo');
  });

  it('add action has meta data', () => {
    const routine = createListRoutine('TEST');
    expect(routine.add('foo', 'bar')).toHaveProperty('meta', 'bar');
  });

  it('provides remove action name', () => {
    const routine = createListRoutine('TEST');
    expect(routine).toHaveProperty('REMOVE', 'TEST/REMOVE');
  });

  it('remove action has remove type', () => {
    const routine = createListRoutine('TEST');
    expect(routine.remove('foo')).toHaveProperty('type', 'TEST/REMOVE');
  });

  it('remove action has a payload', () => {
    const routine = createListRoutine('TEST');
    expect(routine.remove('foo')).toHaveProperty('payload', 'foo');
  });

  it('remove action has meta data', () => {
    const routine = createListRoutine('TEST');
    expect(routine.remove('foo', 'bar')).toHaveProperty('meta', 'bar');
  });

  it('provides clear action name', () => {
    const routine = createListRoutine('TEST');
    expect(routine).toHaveProperty('CLEAR', 'TEST/CLEAR');
  });

  it('clear action has clear type', () => {
    const routine = createListRoutine('TEST');
    expect(routine.clear('foo')).toHaveProperty('type', 'TEST/CLEAR');
  });

  it('list action has default identifier', () => {
    const routine = createListRoutine('TEST', ['TOGGLE']);
    expect(routine.toggle('foo')).toHaveProperty('meta', { uuid: 'foo' });
  });

  it('list action has a defined identifier', () => {
    const routine = createListRoutine('TEST', ['TOGGLE'], 'name');
    expect(routine.toggle('foo')).toHaveProperty('meta', { name: 'foo' });
  });
});
