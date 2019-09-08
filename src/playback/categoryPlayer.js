import { Group, Sound } from 'pizzicato'
import { ipcRenderer } from 'electron'
import { playbackRoutines } from './actions'

export class CategoryPlayer {
  category = null
  group = new Group()
  requestHandlers = {}
  sounds = {}

  constructor () {
    this.listen()
  }

  createSoundFromUrl (dataUrl) {
    let pizziSound
    return new Promise((resolve, reject) => {
      pizziSound = new Sound(dataUrl, (error) => {
        if (error) {
          reject(error)
        }
        resolve()
      })
    }).then(() => pizziSound)
  }

  listen () {
    ipcRenderer.on('backendSays', (event, action) => {
      if (this.requestHandlers[action.type]) {
        this.requestHandlers[action.type](action)
      }
    })
  }

  send (action) {
    return ipcRenderer.send('playbackSays', action)
  }

  handleRequest (routine, handler) {
    this.requestHandlers[routine.REQUEST] = (action) => {
      return handler.call(this, action)
        .then(payload => this.send(routine.success({ ...payload, category: this.category })))
        .catch(error => this.send(routine.failure(action.payload, error)))
    }
  }
}

export function startPlayer () {
  function requireSound (handler) {
    return function (action) {
      return new Promise((resolve, reject) => {
        const sound = this.sounds[action.payload.cachePath]
        if (sound) {
          return handler(action, sound)
        }
        return Promise.reject(new Error(`Sound "${action.payload}" does not exist`))
      })
    }
  }

  const player = new CategoryPlayer()

  player.handleRequest(playbackRoutines.soundAdd, function (action) {
    try {
      return this.createSoundFromUrl(action.payload.dataUrl).then((sound) => {
        this.sounds[action.payload.cachePath] = sound
        this.group.addSound(sound)
        return action.payload.cachePath
      })
    } catch (e) {
      return Promise.reject(e)
    }
  })

  player.handleRequest(playbackRoutines.setCategoryUuid, function (action) {
    this.category = action.payload.category
    return Promise.resolve(action.payload)
  })

  player.handleRequest(playbackRoutines.setVolume, function (action) {
    this.group.volume = action.payload.volume
    return Promise.resolve(action.payload)
  })

  player.handleRequest(playbackRoutines.soundPlay, requireSound(function (action, sound) {
    this.sound.play()
    return Promise.resolve(action.payload)
  }))

  player.handleRequest(playbackRoutines.soundRemove, requireSound(function (action, sound) {
    this.sound.stop()
    this.group.removeSound(sound)
    return Promise.resolve(action.payload)
  }))

  player.handleRequest(playbackRoutines.soundStop, requireSound(function (action, sound) {
    this.sound.stop()
    return Promise.resolve(action.payload)
  }))

  player.handleRequest(playbackRoutines.categoryStop, requireSound(function (action, sound) {
    this.group.stop()
    return Promise.resolve(action.payload)
  }))

  return player
}
