import howler from 'howler';

import sagas from '..';
import getSagaTester from '../../../../mock/sagaTester';

import AudioManager from '../../AudioManager';
import * as localAssetsManager from '../../../LocalAssetsManager';

import { soundList } from '../../actions';

const blankBase64EncodedMp3 = 'data:audio/mp3;base64,it-is-just-a-mock-dont-look-surprised';

describe('soundLoad saga', () => {
  beforeEach(() => {
    jest.spyOn(localAssetsManager, 'downloadSound').mockImplementation();
    jest.spyOn(AudioManager, 'play').mockImplementation();
    jest.spyOn(AudioManager, 'stop').mockImplementation();
    jest.spyOn(howler, 'Howl').mockImplementation();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('triggers audio fetch with sound URL', () => {
    howler.Howl.mockImplementation((config) => {
      config.onload();
    });
    const sagaTester = getSagaTester({
      sounds: {
        list: [
          {
            uuid: 'foo',
            playing: false,
            loop: false,
            path: 'http://example.com/module-name/sound.mp3',
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundList.loadTrigger('foo'));
    return sagaTester.waitFor(soundList.LOAD_FULFILL)
      .then(() => {
        expect(localAssetsManager.downloadSound).toHaveBeenCalledWith(
          'foo',
          'http://example.com/module-name/sound.mp3'
        );
      });
  });

  it('dispatches sound load request', () => {
    howler.Howl.mockImplementation((config) => {
      config.onload();
    });
    const sagaTester = getSagaTester({
      sounds: {
        list: [
          {
            uuid: 'foo',
            playing: false,
            loop: false,
            path: 'http://example.com/module-name/sound.mp3',
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundList.loadTrigger('foo'));
    return sagaTester.waitFor(soundList.LOAD_FULFILL)
      .then(() => expect(sagaTester.numCalled(soundList.LOAD_REQUEST)).toBe(1));
  });

  it('dispatches sound load success', () => {
    howler.Howl.mockImplementation((config) => {
      config.onload();
    });
    localAssetsManager.downloadSound.mockImplementation(() => Promise.resolve({
      blob: blankBase64EncodedMp3,
      cachePath: '/var/tmp/1-second-of-silence.mp3',
      name: '1-second-of-silence.mp3',
      extension: 'mp3',
    }));
    const sagaTester = getSagaTester({
      sounds: {
        list: [
          {
            uuid: 'foo',
            playing: false,
            loop: false,
            path: 'http://example.com/module-name/sound.mp3',
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundList.loadTrigger('foo'));
    return sagaTester.waitFor(soundList.LOAD_FULFILL)
      .then(() => expect(sagaTester.numCalled(soundList.LOAD_SUCCESS)).toBe(1));
  });

  it('dispatches sound load failure on howl error', () => {
    const testError = new Error('Test!');
    howler.Howl.mockImplementation((config) => {
      config.onloaderror(testError);
    });
    localAssetsManager.downloadSound.mockImplementation(() => Promise.resolve({
      blob: blankBase64EncodedMp3,
      cachePath: '/var/tmp/1-second-of-silence.mp3',
      name: '1-second-of-silence.mp3',
      extension: 'mp3',
    }));
    const sagaTester = getSagaTester({
      sounds: {
        list: [
          {
            uuid: 'foo',
            playing: false,
            loop: false,
            path: 'http://example.com/module-name/sound.mp3',
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundList.loadTrigger('foo'));
    return sagaTester.waitFor(soundList.LOAD_FULFILL)
      .then(() => expect(sagaTester.numCalled(soundList.LOAD_FAILURE)).toBe(1));
  });

  it('dispatches sound load failure network error', () => {
    const testError = new Error('Test!');
    localAssetsManager.downloadSound.mockImplementation(() => Promise.reject(testError));
    const sagaTester = getSagaTester({
      sounds: {
        list: [
          {
            uuid: 'foo',
            playing: false,
            loop: false,
            path: 'http://example.com/module-name/sound.mp3',
          },
        ],
      },
    });
    sagaTester.runAll(sagas);
    sagaTester.dispatch(soundList.loadTrigger('foo'));
    return sagaTester.waitFor(soundList.LOAD_FULFILL)
      .then(() => expect(sagaTester.numCalled(soundList.LOAD_FAILURE)).toBe(1));
  });
});
