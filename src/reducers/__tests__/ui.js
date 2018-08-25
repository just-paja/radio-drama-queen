import ui from '../ui';

import { library } from '../../actions';

describe('ui reducer', () => {
  it('sets showSaveAsDialog flag to true on library save as action', () => {
    const state = {
      showSaveAsDialog: false,
    };
    const result = ui(state, library.saveAs());
    expect(result).not.toEqual(state);
    expect(result).toHaveProperty('showSaveAsDialog', true);
  });

  it('sets showSaveAsDialog flag to false on library save as cancel action', () => {
    const state = {
      showSaveAsDialog: true,
    };
    const result = ui(state, library.saveAsCancel());
    expect(result).not.toEqual(state);
    expect(result).toHaveProperty('showSaveAsDialog', false);
  });

  it('sets showSaveAsDialog flag to false on library save as hide action', () => {
    const state = {
      showSaveAsDialog: true,
    };
    const result = ui(state, library.saveAsHide());
    expect(result).not.toEqual(state);
    expect(result).toHaveProperty('showSaveAsDialog', false);
  });
});
