import soundWorkspaceUi from '../soundWorkspaceUi';

import { workspace as actions } from '../../actions';

describe('soundWorkspaceUi reducer', () => {
  it('saves library view selection', () => {
    const state = { view: 'VIEW_BOARD' };
    const result = soundWorkspaceUi(state, actions.selectView('VIEW_LIBRARY'));
    expect(result).not.toEqual(state);
    expect(result).toHaveProperty('view', 'VIEW_LIBRARY');
  });

  it('sets view to board on board selection', () => {
    const state = { view: 'VIEW_LIBRARY' };
    const result = soundWorkspaceUi(state, actions.selectBoard('board1'));
    expect(result).not.toEqual(state);
    expect(result).toHaveProperty('view', 'VIEW_BOARD');
  });

  it('saves board selection on board select', () => {
    const state = { view: 'VIEW_LIBRARY' };
    const result = soundWorkspaceUi(state, actions.selectBoard('board1'));
    expect(result).not.toEqual(state);
    expect(result).toHaveProperty('board', 'board1');
  });
});
