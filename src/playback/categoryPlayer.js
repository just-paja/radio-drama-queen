import { Group, Sound } from 'pizzicato'
import { ipcRenderer } from 'electron'
import { playbackRoutines } from './actions'

let category = null
const group = new Group()
const requestHandlers = {}
const sounds = {}

function send (action) {
  return ipcRenderer.send('playbackSays', action)
}

function handleRequest (routine, handler) {
  requestHandlers[routine.REQUEST] = function (action) {
    return handler(action)
      .then(payload => send(routine.success({ ...payload, category })))
      .catch(error => send(routine.failure(action.payload, error)))
  }
}

function requireSound (handler) {
  return function (action) {
    return new Promise((resolve, reject) => {
      const sound = sounds[action.payload.cachePath]
      if (sound) {
        return handler(action, sound)
      }
      return Promise.reject(new Error(`Sound "${action.payload}" does not exist`))
    })
  }
}

handleRequest(playbackRoutines.soundAdd, action => new Promise((resolve, reject) => {
  const pizziSound = new Sound(action.payload.dataUrl, (error) => {
    if (error) {
      return reject(error)
    }
    sounds[action.payload.cachePath] = pizziSound
    group.addSound(pizziSound)
    return resolve(action.payload.cachePath)
  })
}))

handleRequest(playbackRoutines.setCategoryUuid, (action) => {
  category = action.payload.category
  return Promise.resolve(action.payload)
})

handleRequest(playbackRoutines.setVolume, (action) => {
  group.volume = action.payload.volume
  return Promise.resolve(action.payload)
})

handleRequest(playbackRoutines.soundPlay, requireSound((action, sound) => {
  sound.play()
  return Promise.resolve(action.payload)
}))

handleRequest(playbackRoutines.soundRemove, requireSound((action, sound) => {
  sound.stop()
  group.removeSound(sound)
  return Promise.resolve(action.payload)
}))

handleRequest(playbackRoutines.soundStop, requireSound((action, sound) => {
  sound.stop()
  return Promise.resolve(action.payload)
}))

handleRequest(playbackRoutines.categoryStop, requireSound((action, sound) => {
  group.stop()
  return Promise.resolve(action.payload)
}))

export function startPlayer () {
  send({ type: 'loaded' })
  ipcRenderer.on('backendSays', (event, action) => {
    if (requestHandlers[action.type]) {
      requestHandlers[action.type](action)
    }
  })
}
