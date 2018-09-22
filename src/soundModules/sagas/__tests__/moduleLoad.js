import sagas from '..';

import { getSagaTester } from '../../../../mock';
import { soundModule } from '../../actions';

import * as localAssetsManager from '../../../LocalAssetsManager';

describe('moduleLoad saga', () => {
  beforeEach(() => {
    jest.spyOn(localAssetsManager, 'downloadConfig').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('starts loading module on load trigger', () => {
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'root',
            url: 'http://example.com/tiny.json',
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundModule.loadTrigger('root'));
    expect(sagaTester.getCalledActions()).toContainEqual(soundModule.loadRequest('root'));
  });

  it('saves module config on load trigger', () => {
    localAssetsManager.downloadConfig.mockImplementation(() => Promise.resolve({
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
    }));
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'root',
            url: 'http://example.com/tiny.json',
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundModule.loadTrigger('root'));
    return sagaTester.waitFor(soundModule.LOAD_FULFILL)
      .then(() => {
        expect(sagaTester.getState().soundModules.list).toContainEqual({
          name: 'root',
          loading: false,
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
});
