import { CategoryPlayer, startPlayer } from '../categoryPlayer'
import { ipcRenderer } from 'electron'
import { playbackRoutines } from '../actions'

jest.mock('electron', () => ({
  ipcRenderer: {
    on: jest.fn(),
    receive: jest.fn(),
    send: jest.fn(),
    waitFor: jest.fn()
  }
}))

jest.mock('pizzicato', () => {
  const mockModule = {
    Group: class {
      addSound = jest.fn()
    },
    Sound: function (url, callback) {
      if (callback) {
        callback()
      }
      return {
        play: jest.fn()
      }
    }
  }
  return mockModule
})

describe('categoryPlayer', () => {
  beforeEach(() => {
    ipcRenderer.handler = null
    ipcRenderer.waiters = []
    ipcRenderer.on.mockImplementation(function (channel, handler) {
      this.handler = handler
    })
    ipcRenderer.waitFor.mockImplementation(function (channel, routine) {
      return new Promise((resolve) => {
        this.waiters.push({ channel, routine, resolve })
      })
    })
    ipcRenderer.receive.mockImplementation(function (...args) {
      return this.handler(...args)
    })
    ipcRenderer.send.mockImplementation(function (channel, action) {
      this.waiters.forEach((waiter) => {
        if (channel === waiter.channel) {
          if (action.type === waiter.routine.SUCCESS) {
            waiter.resolve(action)
          } else if (action.type === waiter.routine.FAILURE) {
            throw action.meta
          }
        }
      })
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('creates category player', () => {
    expect(startPlayer()).toBeInstanceOf(CategoryPlayer)
  })

  it('listens to backend messages on create', () => {
    startPlayer()
    expect(ipcRenderer.on).toHaveBeenCalledWith('backendSays', expect.any(Function))
  })

  it('listens to backend just once', () => {
    startPlayer()
    expect(ipcRenderer.on).toHaveBeenCalledTimes(1)
  })

  it('sends actions via playback channel', () => {
    const player = startPlayer()
    player.send({ type: 'TEST' })
    expect(ipcRenderer.send).toHaveBeenCalledWith('playbackSays', { type: 'TEST' })
  })

  it('stores category uuid', () => {
    const player = startPlayer()
    ipcRenderer.receive('backendSays', playbackRoutines.setCategoryUuid.request({ category: 'CATEGORY' }))
    expect(player.category).toBe('CATEGORY')
  })

  it('stores sound on addSound', () => {
    const player = startPlayer()
    const action = playbackRoutines.soundAdd.request({
      cachePath: '/var/tmp/sound.mp3',
      dataUrl: 'x3x5'
    })
    ipcRenderer.receive('backendSays', action)
    return ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd).then((action) => {
      expect(player).toHaveProperty('sounds', expect.objectContaining({
        '/var/tmp/sound.mp3': expect.anything()
      }))
    })
  })

  it('passes dataUrl to pizzicato sound', () => {
    const player = startPlayer()
    jest.spyOn(player, 'createSoundFromUrl')
    const action = playbackRoutines.soundAdd.request({
      cachePath: '/var/tmp/sound.mp3',
      dataUrl: 'x3x5'
    })
    ipcRenderer.receive('backendSays', action)
    return ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd).then(() => {
      expect(player.createSoundFromUrl).toHaveBeenCalledWith('x3x5')
    })
  })

  it('adds sound to the pizzicato group', () => {
    const player = startPlayer()
    const action = playbackRoutines.soundAdd.request({
      cachePath: '/var/tmp/sound.mp3',
      dataUrl: 'x3x5'
    })
    ipcRenderer.receive('backendSays', action)
    return ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd).then(() => {
      expect(player.group.addSound).toHaveBeenCalledWith(player.sounds['/var/tmp/sound.mp3'])
    })
  })
})
