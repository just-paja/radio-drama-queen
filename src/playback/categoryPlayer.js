import { Group, Sound } from 'pizzicato'
import { ipcRenderer } from 'electron'
import { playbackRoutines } from './actions'

const MIN_DELAY = 100

export class CategoryPlayer {
  category = null
  group = new Group()
  requestHandlers = {}
  sounds = {}

  constructor () {
    this.listen()
  }

  async createSoundFromUrl (dataUrl, cachePath) {
    let pizziSound
    await new Promise((resolve, reject) => {
      pizziSound = new Sound(dataUrl, error => {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
    pizziSound.watcher = null
    const clear = () => clearInterval(pizziSound.watcher)
    const end = () => {
      clear()
      ipcRenderer.send(
        'playbackSays',
        playbackRoutines.soundEnd.success({
          cachePath,
          position: 0,
          playing: pizziSound.playing
        })
      )
    }
    pizziSound.on('play', () => {
      let position = 0
      clear()
      pizziSound.watcher = setInterval(() => {
        position += MIN_DELAY
        ipcRenderer.send(
          'playbackSays',
          playbackRoutines.soundProgress.success({
            cachePath,
            position: position / 1000,
            playing: pizziSound.playing
          })
        )
      }, MIN_DELAY)
    })
    pizziSound.on('stop', end)
    pizziSound.on('end', end)
    return pizziSound
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
    this.requestHandlers[routine.REQUEST] = async action => {
      try {
        const payload = await handler.call(this, action)
        return this.send(
          routine.success({ ...payload, category: this.category })
        )
      } catch (error) {
        return this.send(routine.failure(error, action.payload))
      }
    }
  }
}

export function startPlayer () {
  function requireSound (handler) {
    return async function (action) {
      if (action.payload) {
        const sound = this.sounds[action.payload.cachePath]
        if (sound) {
          return await handler.call(this, action, sound)
        }
        throw new Error(`Sound "${action.payload.cachePath}" does not exist`)
      }
    }
  }

  const player = new CategoryPlayer()

  player.handleRequest(playbackRoutines.soundAdd, async function (action) {
    const sound = await this.createSoundFromUrl(
      action.payload.dataUrl,
      action.payload.cachePath
    )
    this.sounds[action.payload.cachePath] = sound
    this.group.addSound(sound)
    const { dataUrl, ...payload } = action.payload
    return payload
  })

  player.handleRequest(playbackRoutines.setCategoryUuid, async function (
    action
  ) {
    this.category = action.payload.category
    return action.payload
  })

  player.handleRequest(playbackRoutines.setVolume, async function (action) {
    this.group.volume = action.payload.volume
    return action.payload
  })

  player.handleRequest(
    playbackRoutines.soundPlay,
    requireSound(async function (action, sound) {
      sound.play()
      return action.payload
    })
  )

  player.handleRequest(
    playbackRoutines.soundRemove,
    requireSound(async function soundRemove (action, sound) {
      sound.stop()
      this.group.removeSound(sound)
      this.sounds = Object.entries(this.sounds)
        .filter(([key, value]) => key !== action.payload.cachePath)
        .reduce(
          (acc, [key, value]) => ({
            ...acc,
            [key]: value
          }),
          {}
        )
      return action.payload
    })
  )

  player.handleRequest(
    playbackRoutines.soundStop,
    requireSound(async function (action, sound) {
      sound.stop()
      return action.payload
    })
  )

  player.handleRequest(playbackRoutines.categoryStop, async function (action) {
    this.group.stop()
    return action.payload
  })

  return player
}
