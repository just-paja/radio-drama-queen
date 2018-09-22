import sagas from '../moduleResources';

import { getSagaTester } from '../../../../mock';
import { soundModule } from '../../actions';

describe('moduleResources saga', () => {
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
    expect(sagaTester.getState().tags.list).toContainEqual({
      name: 'ambient',
      title: {
        en: 'Ambient',
        cs: 'Prostředí',
      },
    });
    expect(sagaTester.getState().tags.list).toContainEqual({
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
    expect(sagaTester.getState().tags.list).toContainEqual({
      name: 'ambient',
    });
    expect(sagaTester.getState().tags.list).toContainEqual({
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
    expect(sagaTester.getState().tags.list).toHaveLength(2);
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
});
