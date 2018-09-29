import sagas from '..';

import { getSagaTester } from '../../../../mock';
import { soundModule } from '../../actions';

import * as localAssetsManager from '../../../LocalAssetsManager';

describe('moduleResources saga', () => {
  beforeEach(() => {
    jest.spyOn(localAssetsManager, 'downloadConfig').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('adds module tags to the state', () => {
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'studio-test',
            url: 'http://example.com/module.json',
            modules: [],
            tags: [
              {
                name: 'ambient',
                title: {
                  en: 'Ambient',
                  cs: 'Prostředí',
                },
              },
              {
                name: 'horor',
                title: {
                  en: 'Horror',
                  cs: 'Horor',
                },
              },
            ],
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundModule.loadSuccess('studio-test'));
    expect(sagaTester.getState().soundTags.list).toContainEqual({
      name: 'ambient',
      title: {
        en: 'Ambient',
        cs: 'Prostředí',
      },
    });
    expect(sagaTester.getState().soundTags.list).toContainEqual({
      name: 'horor',
      title: {
        en: 'Horror',
        cs: 'Horor',
      },
    });
  });

  it('creates tags matching sound only defined tags', () => {
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'studio-test',
            url: 'http://example.com/module.json',
            modules: [],
            sounds: [
              {
                name: 'ambient-sound.mp3',
                tags: ['ambient', 'horror'],
              },
            ],
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundModule.loadSuccess('studio-test'));
    expect(sagaTester.getState().soundTags.list).toContainEqual({
      name: 'ambient',
    });
    expect(sagaTester.getState().soundTags.list).toContainEqual({
      name: 'horror',
    });
  });

  it('does not create duplicate tags', () => {
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'studio-test',
            url: 'http://example.com/module.json',
            modules: [],
            sounds: [
              {
                name: 'ambient-sound.mp3',
                tags: ['ambient', 'horror'],
              },
              {
                name: 'ambient-sound-2.mp3',
                tags: ['ambient', 'horror'],
              },
            ],
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundModule.loadSuccess('studio-test'));
    expect(sagaTester.getState().soundTags.list).toHaveLength(2);
  });

  it('adds submodules to the database', () => {
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'studio-test',
            url: 'http://example.com/module.json',
            modules: ['foo'],
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundModule.loadSuccess('studio-test'));
    expect(sagaTester.getState().soundModules.list).toContainEqual(expect.objectContaining({
      name: 'foo',
      url: 'http://example.com/foo/manifest.json',
      loading: false,
    }));
  });

  it('triggers all submodules loading', () => {
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'studio-test',
            url: 'http://example.com/module.json',
            modules: ['foo', 'bar'],
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundModule.loadSuccess('studio-test'));
    expect(sagaTester.getCalledActions()).toContainEqual(soundModule.loadTrigger(['foo', 'bar']));
  });

  it('loads submodules of submodules loading', () => {
    localAssetsManager.downloadConfig.mockImplementationOnce(() => Promise.resolve({
      name: 'foo',
      modules: ['bar'],
    }));
    localAssetsManager.downloadConfig.mockImplementationOnce(() => Promise.resolve({
      name: 'bar',
      tags: [
        {
          name: 'barTag',
        },
      ],
    }));
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'studio-test',
            url: 'http://example.com/module.json',
            modules: ['foo'],
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundModule.loadSuccess('studio-test'));
    return sagaTester.waitFor(soundModule.LOAD_FULFILL)
      .then(() => {
        expect(sagaTester.getCalledActions()).toContainEqual(soundModule.loadTrigger(['foo']));
        expect(localAssetsManager.downloadConfig).toHaveBeenCalledWith('http://example.com/foo/manifest.json');
        expect(sagaTester.getCalledActions()).toContainEqual(soundModule.loadTrigger(['bar']));
        expect(localAssetsManager.downloadConfig).toHaveBeenCalledWith('http://example.com/foo/bar/manifest.json');
      });
  });
});
