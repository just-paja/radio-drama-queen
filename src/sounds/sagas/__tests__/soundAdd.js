import { call } from 'redux-saga/effects';

import howler from 'howler';

import sagas, { registerSound } from '..';
import getSagaTester from '../../../../mock/sagaTester';

import { soundList } from '../../actions';

jest.mock('uuid/v4', () => ({
  __esModule: true,
  default: () => 'uuid-test',
}));

describe('registerSound saga', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('adds sound to the list with randomly generated uuid', () => {
    const sagaTester = getSagaTester({
      sounds: {
        list: [],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.run(registerSound, {
      name: 'foo',
    });
    expect(sagaTester.getState().sounds.list).toContainEqual(expect.objectContaining({
      uuid: 'uuid-test',
    }));
  });

  it('returns randomly generated uuid after adding the sound', () => {
    const sagaTester = getSagaTester({
      sounds: {
        list: [],
      },
    });
    let returnValue;
    function* testRegisterSound(resource) {
      returnValue = yield call(registerSound, resource);
    }
    sagaTester.runAll(sagas);
    sagaTester.run(testRegisterSound, {
      name: 'foo',
    });
    expect(returnValue).toBe('uuid-test');
  });

  it('uses sound as path when given string', () => {
    const sagaTester = getSagaTester({
      sounds: {
        list: [],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.run(registerSound, 'http://example.com/test.mp3');
    expect(sagaTester.getState().sounds.list).toContainEqual(expect.objectContaining({
      path: 'http://example.com/test.mp3',
    }));
  });

  it('uses sound path file name as name when given string', () => {
    const sagaTester = getSagaTester({
      sounds: {
        list: [],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.run(registerSound, 'http://example.com/test.mp3');
    expect(sagaTester.getState().sounds.list).toContainEqual(expect.objectContaining({
      name: 'test',
    }));
  });

  it('uses sound path file name as name when given object with path', () => {
    const sagaTester = getSagaTester({
      sounds: {
        list: [],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.run(registerSound, {
      path: 'http://example.com/test.mp3',
    });
    expect(sagaTester.getState().sounds.list).toContainEqual(expect.objectContaining({
      name: 'test',
    }));
  });

  it('uses given name', () => {
    const sagaTester = getSagaTester({
      sounds: {
        list: [],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.run(registerSound, {
      path: 'http://example.com/test.mp3',
      name: 'foo',
    });
    expect(sagaTester.getState().sounds.list).toContainEqual(expect.objectContaining({
      name: 'foo',
    }));
  });

  it('uses empty array as sound tags when not given', () => {
    const sagaTester = getSagaTester({
      sounds: {
        list: [],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.run(registerSound, {
      path: 'http://example.com/test.mp3'
    });
    expect(sagaTester.getState().sounds.list).toContainEqual(expect.objectContaining({
      tags: [],
    }));
  });
});
