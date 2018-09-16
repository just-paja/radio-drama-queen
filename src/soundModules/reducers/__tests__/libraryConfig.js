import libraryConfig from '../libraryConfig';

import { library } from '../../actions';

describe('libraryConfig reducer', () => {
  it('sets fsPath on save as submit action', () => {
    const state = {
      fsPath: null,
    };
    const result = libraryConfig(state, library.saveAsSubmit({
      fsPath: '/home/test/library.json',
    }));
    expect(result).not.toEqual(state);
    expect(result).toHaveProperty('fsPath', '/home/test/library.json');
  });
});
