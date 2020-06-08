import { CategoryPlayer, startPlayer } from '../categoryPlayer'
import { ipcRenderer } from 'electron'
import { playbackRoutines } from '../actions'
import pizzicato from 'pizzicato'

jest.mock('electron', () => ({
  ipcRenderer: {
    on: jest.fn(),
    receive: jest.fn(),
    send: jest.fn(),
    waitFor: jest.fn()
  }
}))

jest.mock('pizzicato', () => {
  const categoryStop = jest.fn()
  const soundPlay = jest.fn()
  const soundStop = jest.fn()
  const groupSoundAdd = jest.fn()
  const groupSoundRemove = jest.fn()
  const mockModule = {
    categoryStop,
    groupSoundAdd,
    groupSoundRemove,
    soundPlay,
    soundStop,
    Group: class {
      addSound = groupSoundAdd
      removeSound = groupSoundRemove
      stop = categoryStop
    },
    Sound: function (url, callback) {
      if (callback) {
        callback(url === 'fail' ? 'Simulated failure' : null)
      }
      return {
        play: soundPlay,
        stop: soundStop
      }
    }
  }
  return mockModule
})

describe('categoryPlayer', () => {
  beforeEach(() => {
    ipcRenderer.handler = null
    ipcRenderer.waiters = []
    ipcRenderer.sent = []
    ipcRenderer.on.mockImplementation(function (channel, handler) {
      this.handler = handler
    })
    ipcRenderer.waitFor.mockImplementation(function (channel, routine) {
      return new Promise((resolve, reject) => {
        this.waiters.push({ channel, routine, resolve, reject })
      })
    })
    ipcRenderer.receive.mockImplementation(function (...args) {
      return this.handler(...args)
    })
    ipcRenderer.send.mockImplementation(function (channel, action) {
      this.sent.push(action)
      this.waiters.forEach(waiter => {
        if (channel === waiter.channel) {
          if (action.type === waiter.routine.SUCCESS) {
            waiter.resolve(action)
          } else if (action.type === waiter.routine.FAILURE) {
            waiter.reject(action.payload)
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
    expect(ipcRenderer.on).toHaveBeenCalledWith(
      'backendSays',
      expect.any(Function)
    )
  })

  it('listens to backend just once', () => {
    startPlayer()
    expect(ipcRenderer.on).toHaveBeenCalledTimes(1)
  })

  it('sends actions via playback channel', () => {
    const player = startPlayer()
    player.send({ type: 'TEST' })
    expect(ipcRenderer.send).toHaveBeenCalledWith('playbackSays', {
      type: 'TEST'
    })
  })

  it('stores category uuid', () => {
    const player = startPlayer()
    ipcRenderer.receive(
      'backendSays',
      playbackRoutines.setCategoryUuid.request({ category: 'CATEGORY' })
    )
    expect(player.category).toBe('CATEGORY')
  })

  it('stores sound on addSound', () => {
    const player = startPlayer()
    const action = playbackRoutines.soundAdd.request({
      cachePath: '/var/tmp/sound.mp3',
      dataUrl: 'x3x5'
    })
    ipcRenderer.receive('backendSays', action)
    return ipcRenderer
      .waitFor('playbackSays', playbackRoutines.soundAdd)
      .then(action => {
        expect(player).toHaveProperty(
          'sounds',
          expect.objectContaining({
            '/var/tmp/sound.mp3': expect.anything()
          })
        )
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
    return ipcRenderer
      .waitFor('playbackSays', playbackRoutines.soundAdd)
      .then(() => {
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
    return ipcRenderer
      .waitFor('playbackSays', playbackRoutines.soundAdd)
      .then(() => {
        expect(player.group.addSound).toHaveBeenCalledWith(
          player.sounds['/var/tmp/sound.mp3']
        )
      })
  })

  it('dispatches failure on sound create error', async () => {
    startPlayer()
    const action = playbackRoutines.soundAdd.request({
      cachePath: '/var/tmp/sound.mp3',
      dataUrl: 'fail'
    })
    ipcRenderer.receive('backendSays', action)
    await expect(
      ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd)
    ).rejects.toEqual('Simulated failure')
  })

  it('does not react (aka nothing bad happens) to unknown messages', async () => {
    startPlayer()
    const action = {
      type: 'UNKNOWN_MESSAGE'
    }
    ipcRenderer.receive('backendSays', action)
    expect(ipcRenderer.sent).toEqual([])
  })

  it('sets group volume on set volume action', async () => {
    const player = startPlayer()
    const action = playbackRoutines.setVolume.request({ volume: 0.2 })
    ipcRenderer.receive('backendSays', action)
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.setVolume)
    expect(player.group.volume).toEqual(0.2)
  })

  it('plays sound on play action', async () => {
    startPlayer()
    ipcRenderer.receive(
      'backendSays',
      playbackRoutines.soundAdd.request({
        cachePath: '/var/tmp/sound.mp3',
        dataUrl: 'x3x5'
      })
    )
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd)
    const action = playbackRoutines.soundPlay.request({
      cachePath: '/var/tmp/sound.mp3'
    })
    ipcRenderer.receive('backendSays', action)
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundPlay)
    expect(pizzicato.soundPlay).toHaveBeenCalled()
  })

  it('stops sound on remove action', async () => {
    startPlayer()
    ipcRenderer.receive(
      'backendSays',
      playbackRoutines.soundAdd.request({
        cachePath: '/var/tmp/sound.mp3',
        dataUrl: 'x3x5'
      })
    )
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd)
    const action = playbackRoutines.soundRemove.request({
      cachePath: '/var/tmp/sound.mp3'
    })
    ipcRenderer.receive('backendSays', action)
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundRemove)
    expect(pizzicato.soundStop).toHaveBeenCalled()
  })

  it('removes sound from pizzicato group on remove action', async () => {
    startPlayer()
    ipcRenderer.receive(
      'backendSays',
      playbackRoutines.soundAdd.request({
        cachePath: '/var/tmp/sound.mp3',
        dataUrl: 'x3x5'
      })
    )
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd)
    const action = playbackRoutines.soundRemove.request({
      cachePath: '/var/tmp/sound.mp3'
    })
    ipcRenderer.receive('backendSays', action)
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundRemove)
    expect(pizzicato.groupSoundRemove).toHaveBeenCalled()
  })

  it('removes sound on remove action', async () => {
    const player = startPlayer()
    ipcRenderer.receive(
      'backendSays',
      playbackRoutines.soundAdd.request({
        cachePath: '/var/tmp/sound.mp3',
        dataUrl: 'x3x5'
      })
    )
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd)
    const action = playbackRoutines.soundRemove.request({
      cachePath: '/var/tmp/sound.mp3'
    })
    ipcRenderer.receive('backendSays', action)
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundRemove)
    expect(player.sounds).toEqual({})
  })

  it('keeps other sounds on remove action', async () => {
    const player = startPlayer()
    ipcRenderer.receive(
      'backendsays',
      playbackRoutines.soundAdd.request({
        cachePath: '/var/tmp/sound.mp3',
        dataUrl: 'x3x5'
      })
    )
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd)
    ipcRenderer.receive(
      'backendsays',
      playbackRoutines.soundAdd.request({
        cachePath: '/var/tmp/sound-2.mp3',
        dataUrl: 'x3x5'
      })
    )
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd)
    const action = playbackRoutines.soundRemove.request({
      cachePath: '/var/tmp/sound.mp3'
    })
    ipcRenderer.receive('backendSays', action)
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundRemove)
    expect(player.sounds).toEqual({
      '/var/tmp/sound-2.mp3': expect.anything()
    })
  })

  it('stops sound on stop action', async () => {
    startPlayer()
    ipcRenderer.receive(
      'backendSays',
      playbackRoutines.soundAdd.request({
        cachePath: '/var/tmp/sound.mp3',
        dataUrl: 'x3x5'
      })
    )
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd)
    const action = playbackRoutines.soundStop.request({
      cachePath: '/var/tmp/sound.mp3'
    })
    ipcRenderer.receive('backendSays', action)
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundStop)
    expect(pizzicato.soundStop).toHaveBeenCalled()
  })

  it('stops sound category on stop action', async () => {
    startPlayer()
    ipcRenderer.receive(
      'backendSays',
      playbackRoutines.soundAdd.request({
        cachePath: '/var/tmp/sound.mp3',
        dataUrl: 'x3x5'
      })
    )
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.soundAdd)
    const action = playbackRoutines.categoryStop.request()
    ipcRenderer.receive('backendSays', action)
    await ipcRenderer.waitFor('playbackSays', playbackRoutines.categoryStop)
    expect(pizzicato.categoryStop).toHaveBeenCalled()
  })
})
