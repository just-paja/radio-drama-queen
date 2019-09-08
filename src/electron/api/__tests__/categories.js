import { startBackend } from '..'
import { categoryRoutines } from '../../../soundCategories/actions'
import { BrowserWindow } from 'electron'

jest.mock('electron', () => require('../../../mock/electron'))

describe('Categories handler', () => {
  let app = null
  let targetWindow = null

  beforeEach(() => {
    global.PLAYBACK_WINDOW_WEBPACK_ENTRY = '/'
    targetWindow = new BrowserWindow()
    app = startBackend(targetWindow)
  })

  afterEach(() => {
    app.terminate()
  })

  it.only('createCategory creates new category', () => {
    return app.handleIncomingAction(categoryRoutines.create.request()).then(results => {
      expect(app.state).toHaveProperty('entities.categories', [
        expect.objectContaining({
          name: 'Unnamed 1'
        })
      ])
    })
  })

  it('rename renames category', () => {
    app.state.entities = {
      categories: [
        {
          name: 'Unnamed 1',
          uuid: 'category-1'
        }
      ]
    }
    return app.handleIncomingAction(categoryRoutines.rename.request({
      name: 'Nature',
      uuid: 'category-1'
    })).then(results => {
      expect(app.state).toHaveProperty('entities.categories', [
        expect.objectContaining({
          name: 'Nature',
          uuid: 'category-1'
        })
      ])
    })
  })

  it('mute mutes category', () => {
    app.state.entities = {
      categories: [
        {
          uuid: 'category-1',
          muted: false
        }
      ]
    }
    return app.handleIncomingAction(categoryRoutines.mute.request('category-1')).then(results => {
      expect(app.state).toHaveProperty('entities.categories', [
        expect.objectContaining({
          uuid: 'category-1',
          muted: true
        })
      ])
    })
  })

  it('mute unmutes category', () => {
    app.state.entities = {
      categories: [
        {
          uuid: 'category-1',
          muted: true
        }
      ]
    }
    return app.handleIncomingAction(categoryRoutines.unmute.request('category-1')).then(results => {
      expect(app.state).toHaveProperty('entities.categories', [
        expect.objectContaining({
          uuid: 'category-1',
          muted: false
        })
      ])
    })
  })

  it('loopOn turns loop on category', () => {
    app.state.entities = {
      categories: [
        {
          uuid: 'category-1',
          loop: false
        }
      ]
    }
    return app.handleIncomingAction(categoryRoutines.loopOn.request('category-1')).then(results => {
      expect(app.state).toHaveProperty('entities.categories', [
        expect.objectContaining({
          uuid: 'category-1',
          loop: true
        })
      ])
    })
  })

  it('loopOff turns loop off category', () => {
    app.state.entities = {
      categories: [
        {
          uuid: 'category-1',
          loop: true
        }
      ]
    }
    return app.handleIncomingAction(categoryRoutines.loopOff.request('category-1')).then(results => {
      expect(app.state).toHaveProperty('entities.categories', [
        expect.objectContaining({
          uuid: 'category-1',
          loop: false
        })
      ])
    })
  })

  it('exclusiveOn turns exclusive on category', () => {
    app.state.entities = {
      categories: [
        {
          uuid: 'category-1',
          exclusive: false
        }
      ]
    }
    return app.handleIncomingAction(categoryRoutines.exclusiveOn.request('category-1')).then(results => {
      expect(app.state).toHaveProperty('entities.categories', [
        expect.objectContaining({
          uuid: 'category-1',
          exclusive: true
        })
      ])
    })
  })

  it('exclusiveOff turns exclusive off category', () => {
    app.state.entities = {
      categories: [
        {
          uuid: 'category-1',
          exclusive: true
        }
      ]
    }
    return app.handleIncomingAction(categoryRoutines.exclusiveOff.request('category-1')).then(results => {
      expect(app.state).toHaveProperty('entities.categories', [
        expect.objectContaining({
          uuid: 'category-1',
          exclusive: false
        })
      ])
    })
  })

  it('soundAdd adds sound uuid to the category', () => {
    app.state.entities = {
      categories: [
        {
          uuid: 'category-1'
        }
      ]
    }
    return app.handleIncomingAction(categoryRoutines.soundAdd.request({
      sound: 'sound-1',
      uuid: 'category-1'
    })).then(results => {
      expect(app.state).toHaveProperty('entities.categories', [
        expect.objectContaining({
          sounds: ['sound-1'],
          uuid: 'category-1'
        })
      ])
    })
  })

  it('soundRemove removes sound uuid from the category', () => {
    app.state.entities = {
      categories: [
        {
          sounds: ['sound-1', 'sound-2', 'sound-3'],
          uuid: 'category-1'
        }
      ]
    }
    return app.handleIncomingAction(categoryRoutines.soundRemove.request({
      sound: 'sound-2',
      uuid: 'category-1'
    })).then(results => {
      expect(app.state).toHaveProperty('entities.categories', [
        expect.objectContaining({
          sounds: ['sound-1', 'sound-3'],
          uuid: 'category-1'
        })
      ])
    })
  })
})
