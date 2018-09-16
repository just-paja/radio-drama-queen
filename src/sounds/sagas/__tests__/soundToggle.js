import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

import AudioManager from '../../AudioManager';

import { soundList } from '../../actions';

describe('soundToggle saga', () => {
  beforeEach(() => {
    jest.spyOn(AudioManager, 'play').mockImplementation();
    jest.spyOn(AudioManager, 'stop').mockImplementation();
  });

  it('dispatches play action when sound is not playing', () => {
    const sagaTester = getSagaTester({
      sounds: {
        list: [
          {
            uuid: 'foo',
            playing: false,
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundList.toggle('foo'));
    expect(sagaTester.numCalled(soundList.PLAY)).toBe(1);
  });

  it('dispatches stop action when sound is playing', () => {
    const sagaTester = getSagaTester({
      sounds: {
        list: [
          {
            uuid: 'foo',
            playing: true,
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundList.toggle('foo'));
    expect(sagaTester.numCalled(soundList.STOP)).toBe(1);
  });
});
