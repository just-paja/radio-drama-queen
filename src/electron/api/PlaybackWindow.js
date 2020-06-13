const { BrowserWindow } = require('electron')
const { playbackRoutines } = require('../../playback/actions')
const { generateUuid } = require('../uuid')

const WINDOW_CONFIG = {
  height: 1,
  show: false,
  title: 'Radio Drama Queen playback',
  width: 1,
  webPreferences: {
    nodeIntegration: true
  }
}

export class PlaybackWindow {
  constructor (app, categoryUuid, boardUuid) {
    this.app = app
    this.boardUuid = boardUuid
    this.categoryUuid = categoryUuid
    this.queue = []
    this.sounds = []
  }

  closeWindow () {
    this.window.close()
    this.window = null
  }

  hasSound (cachePath) {
    return this.sounds.indexOf(cachePath) !== -1
  }

  async openWindow () {
    this.window = new BrowserWindow(WINDOW_CONFIG)
    this.window.removeMenu()
    await this.window
      // eslint-disable-next-line no-undef
      .loadURL(PLAYBACK_WINDOW_WEBPACK_ENTRY)
    // this.window.webContents.openDevTools()
    this.listen()
    await this.request(playbackRoutines.setCategoryUuid, {
      board: this.boardUuid,
      uuid: this.categoryUuid
    })
    return {
      board: this.boardUuid,
      category: this.categoryUuid
    }
  }

  handleIncomingAction (action) {
    this.queue = this.queue.reduce((aggr, handler) => {
      if (handler.operation === action.payload.operation) {
        handler.resolve(action)
        return aggr
      }
      return [...aggr, handler]
    }, [])
    this.app.store.dispatch(action)
    this.app.messenger.sendMessage(action)
  }

  listen () {
    this.window.webContents.on('ipc-message', (event, channel, action) =>
      this.handleIncomingAction(action)
    )
  }

  request (routine, payload) {
    const operation = generateUuid()
    this.window.webContents.send(
      'backendSays',
      routine.request({ ...payload, operation })
    )
    return this.waitFor(operation).then(result => {
      if (result.type === routine.FAILURE) {
        throw routine.payload
      }
      return result.payload
    })
  }

  waitFor (operation) {
    return new Promise(resolve => {
      this.queue = this.queue.concat([{ operation, resolve }])
    })
  }

  setExclusiveOn () {
    return this.request(playbackRoutines.setExclusiveOn)
  }

  setExclusiveOff () {
    return this.request(playbackRoutines.setExclusiveOff)
  }

  setLoopOn () {
    return this.request(playbackRoutines.setLoopOn)
  }

  setLoopOff () {
    return this.request(playbackRoutines.setLoopOff)
  }

  setMuteOn () {
    return this.request(playbackRoutines.setMuteOn)
  }

  setMuteOff () {
    return this.request(playbackRoutines.setMuteOff)
  }

  setVolume (volume) {
    return this.request(playbackRoutines.setVolume, { volume })
  }

  soundAdd (cachePath) {
    return this.app.workOn('readSoundDataUrl', { cachePath }).then(dataUrl => {
      this.sounds = this.sounds.concat([cachePath])
      this.request(playbackRoutines.soundAdd, {
        cachePath,
        dataUrl
      })
    })
  }

  soundPlay (cachePath) {
    return this.request(playbackRoutines.soundPlay, { cachePath })
  }

  soundStop (cachePath) {
    return this.request(playbackRoutines.soundStop, { cachePath })
  }

  soundRemove (cachePath) {
    this.sounds = this.sounds.filter(sound => sound === cachePath)
    return this.request(playbackRoutines.soundRemove, { cachePath })
  }
}
