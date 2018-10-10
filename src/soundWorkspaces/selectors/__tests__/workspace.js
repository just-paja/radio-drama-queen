import * as selectors from '..';

describe('soundWorkspaces workspace selectors', () => {
  it('getActiveBoardUuid returns active board uuid', () => {
    const state = {
      soundWorkspaces: {
        ui: {
          board: 'board-1',
        },
      },
    };
    expect(selectors.getActiveBoardUuid(state)).toEqual('board-1');
  });

  it('getActiveBoard returns active board', () => {
    const state = {
      soundBoards: {
        list: [
          {
            uuid: 'board-1',
            name: 'Board 1',
          },
        ],
      },
      soundWorkspaces: {
        ui: {
          board: 'board-1',
        },
      },
    };
    expect(selectors.getActiveBoard(state)).toEqual({
      uuid: 'board-1',
      name: 'Board 1',
    });
  });

  it('given no board is active getDefaultTargetBoard returns first available board', () => {
    const state = {
      soundBoards: {
        list: [
          {
            uuid: 'board-1',
            name: 'Board 1',
          },
        ],
      },
      soundWorkspaces: {
        ui: {},
      },
    };
    expect(selectors.getDefaultTargetBoard(state)).toEqual({
      uuid: 'board-1',
      name: 'Board 1',
    });
  });

  it('given a board is active getDefaultTargetBoard returns the active board', () => {
    const state = {
      soundBoards: {
        list: [
          {
            uuid: 'board-1',
            name: 'Board 1',
          },
          {
            uuid: 'board-2',
            name: 'Board 2',
          },
        ],
      },
      soundWorkspaces: {
        ui: {
          board: 'board-2',
        },
      },
    };
    expect(selectors.getDefaultTargetBoard(state)).toEqual({
      uuid: 'board-2',
      name: 'Board 2',
    });
  });

  it('getWorkspaceView returns workspace active view', () => {
    const state = {
      soundWorkspaces: {
        ui: {
          view: 'VIEW_BOARD',
        },
      },
    };
    expect(selectors.getWorkspaceView(state)).toEqual('VIEW_BOARD');
  });
});
