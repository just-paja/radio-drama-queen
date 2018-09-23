import { initialize, startSubmit, stopSubmit } from 'redux-form';

import sagas from '../libraryLoad';

import { getSagaTester } from '../../../../mock';
import { libraryLoad, libraryWipe, soundModule } from '../../actions';

import * as localAssetsManager from '../../../LocalAssetsManager';

describe('libraryLoad saga', () => {
  beforeEach(() => {
    jest.spyOn(localAssetsManager, 'downloadConfig').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('starts submit phase of library load form', () => {
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(libraryLoad.submit());
    expect(sagaTester.getCalledActions()).toContainEqual(startSubmit('libraryLoad'));
  });

  it('stops submit phase of library load form on error', () => {
    const testError = new Error('Test!');
    localAssetsManager.downloadConfig.mockImplementation(() => Promise.reject(testError));
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(libraryLoad.submit());
    return sagaTester.waitFor(libraryLoad.FULFILL)
      .then(() => {
        expect(sagaTester.getCalledActions()).toContainEqual(stopSubmit(
          'libraryLoad',
          { url: testError }
        ));
      });
  });

  it('saves received config as root module', () => {
    localAssetsManager.downloadConfig.mockImplementation(() => Promise.resolve({
      name: 'studio-test',
      modules: [
        'alarms',
      ],
      tags: [
        {
          name: 'ambient',
          title: {
            en: 'Ambient',
            cs: 'Prostředí',
          },
        },
      ],
    }));
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(initialize('libraryLoad', { url: 'http://example.com/module.json' }));
    sagaTester.dispatch(libraryLoad.submit());
    return sagaTester.waitFor(libraryLoad.FULFILL).then(() => {
      expect(sagaTester.getState().soundModules.config).toHaveProperty('rootModule', {
        name: 'studio-test',
        url: 'http://example.com/module.json',
        modules: [
          'alarms',
        ],
        tags: [
          {
            name: 'ambient',
            title: {
              en: 'Ambient',
              cs: 'Prostředí',
            },
          },
        ],
      });
    });
  });

  it('hides dialog on success', () => {
    const sagaTester = getSagaTester({
      soundModules: {
        ui: {
          showOpenLibraryDialog: true,
        },
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(libraryLoad.success({
      rootModule: {
        name: 'root',
      },
      url: 'http://example.com/index.json',
    }));
    expect(sagaTester.getState().soundModules.ui).toHaveProperty('showOpenLibraryDialog', false);
  });

  it('saves root module as a module', () => {
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(libraryLoad.success({
      rootModule: {
        name: 'foo',
        url: 'http://example.com/index.json',
      },
      url: 'http://example.com/index.json',
    }));
    expect(sagaTester.getState().soundModules.config).toHaveProperty('rootModule', {
      name: 'foo',
      url: 'http://example.com/index.json',
    });
  });

  it('triggers library wipe on load', () => {
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(libraryLoad.success({
      rootModule: {
        name: 'foo',
        url: 'http://example.com/index.json',
      },
      url: 'http://example.com/index.json',
    }));
    expect(sagaTester.numCalled(libraryWipe.TRIGGER)).toBe(1);
  });

  it('triggers root module load', () => {
    const sagaTester = getSagaTester();
    sagaTester.runAll(sagas);
    sagaTester.dispatch(libraryLoad.success({
      rootModule: {
        name: 'foo',
        url: 'http://example.com/index.json',
      },
      url: 'http://example.com/index.json',
    }));
    expect(sagaTester.getCalledActions()).toContainEqual(soundModule.loadTrigger('foo'));
  });
});
