import * as selectors from '..'

describe('soundBoards selectors', () => {
  it('getBoardsWithStatus returns boards with playing flag when one of its sounds is playing', () => {
    const state = {
      entities: {
        sounds: [
          {
            path: 'http://example.com/foo',
            uuid: 'uuid-sound-1',
            playing: false
          },
          {
            path: 'http://example.com/foo',
            uuid: 'uuid-sound-2',
            playing: true
          }
        ],
        categories: [
          {
            uuid: 'uuid-category',
            name: 'bar',
            sounds: ['uuid-sound-1', 'uuid-sound-2'],
            board: 'uuid-board-1'
          }
        ],
        boards: [
          {
            uuid: 'uuid-board-1',
            name: 'foo'
          },
          {
            uuid: 'uuid-board-2',
            name: 'bar'
          }
        ]
      }
    }
    expect(selectors.getBoardsWithStatus(state)).toEqual([
      {
        uuid: 'uuid-board-1',
        name: 'foo',
        playing: true
      },
      {
        uuid: 'uuid-board-2',
        name: 'bar',
        playing: false
      }
    ])
  })

  it('getBoardCategories returns board category list', () => {
    const state = {
      entities: {
        categories: [
          {
            uuid: 'uuid-category-1',
            name: 'bar',
            sounds: ['uuid-sound-1', 'uuid-sound-2'],
            board: 'uuid-board-1'
          },
          {
            uuid: 'uuid-category-2',
            name: 'foo',
            sounds: [],
            board: 'uuid-board-2'
          }
        ],
        boards: [
          {
            uuid: 'uuid-board-1',
            name: 'foo'
          }
        ]
      }
    }
    expect(selectors.getBoardCategories(state, 'uuid-board-1', 'bar')).toEqual([
      {
        uuid: 'uuid-category-1',
        name: 'bar',
        sounds: ['uuid-sound-1', 'uuid-sound-2'],
        board: 'uuid-board-1'
      }
    ])
  })

  it('getBoardCategoryByName returns board category with name given it exists', () => {
    const state = {
      entities: {
        categories: [
          {
            uuid: 'uuid-category',
            name: 'bar',
            sounds: ['uuid-sound-1', 'uuid-sound-2'],
            board: 'uuid-board-1'
          }
        ],
        boards: [
          {
            uuid: 'uuid-board-1',
            name: 'foo'
          }
        ]
      }
    }
    expect(selectors.getBoardCategoryByName(state, 'uuid-board-1', 'bar')).toEqual({
      uuid: 'uuid-category',
      name: 'bar',
      sounds: ['uuid-sound-1', 'uuid-sound-2'],
      board: 'uuid-board-1'
    })
  })

  it('getBoardCategoryByName returns undefined given category exists, but does not belong to the board', () => {
    const state = {
      entities: {
        categories: [
          {
            uuid: 'uuid-category',
            name: 'bar',
            sounds: ['uuid-sound-1', 'uuid-sound-2'],
            board: 'uuid-board-2'
          }
        ],
        boards: [
          {
            uuid: 'uuid-board-1',
            name: 'foo'
          }
        ]
      }
    }
    expect(selectors.getBoardCategoryByName(state, 'uuid-board-1', 'bar')).toEqual(undefined)
  })

  it('getBoardCategoryByName returns undefined given category with such name does not exist', () => {
    const state = {
      entities: {
        categories: [
          {
            uuid: 'uuid-category',
            name: 'foo',
            sounds: ['uuid-sound-1', 'uuid-sound-2'],
            board: 'uuid-board-1'
          }
        ],
        boards: [
          {
            uuid: 'uuid-board-1',
            name: 'foo'
          }
        ]
      }
    }
    expect(selectors.getBoardCategoryByName(state, 'uuid-board-1', 'bar')).toEqual(undefined)
  })

  it('getBoardCategoryUuids returns list of board category uuids', () => {
    const state = {
      entities: {
        categories: [
          {
            uuid: 'uuid-category-1',
            name: 'foo',
            sounds: [],
            board: 'uuid-board-1'
          },
          {
            uuid: 'uuid-category-2',
            name: 'bar',
            sounds: [],
            board: 'uuid-board-1'
          }
        ],
        boards: [
          {
            uuid: 'uuid-board-1',
            name: 'foo'
          }
        ]
      }
    }
    expect(selectors.getBoardCategoryUuids(state, 'uuid-board-1')).toEqual([
      'uuid-category-1',
      'uuid-category-2'
    ])
  })
})
