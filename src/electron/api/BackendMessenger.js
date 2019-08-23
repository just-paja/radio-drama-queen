const { ipcMain } = require('electron')
const { MessageListener } = require('./MessageListener')

class BackendMessenger {
  constructor (targetWindow, store, workerPool, debug) {
    this.window = targetWindow
    this.store = store
    this.workerPool = workerPool
    this.debug = debug
    this.listeners = []
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToIpc()
  }

  dispatch (action) {
    this.handleIncomingAction(action)
  }

  handleIncomingAction (action) {
    if (action.type.includes('FAILURE')) {
      console.log('in', action.type, JSON.stringify(action))
    }
    this.store.dispatch(action)
    return Promise.all(
      this.listeners
        .filter(listener => listener.matchesAction(action))
        .map(listener => listener.run(action, this))
    ).then(results => results.map(this.sendMessage))
  }

  subscribeToIpc () {
    ipcMain.on('frontendSays', (event, action) => this.handleIncomingAction(action))
  }

  sendMessage (action) {
    if (action.type.includes('FAILURE')) {
      console.log('out', action.type, JSON.stringify(action))
    }
    this.store.dispatch(action)
    this.window.webContents.send('backendSays', Object.assign({}, action, {
      timestamp: new Date()
    }))
    return action
  }

  handleAction (routine, requestHandler) {
    this.listeners.push(new MessageListener(routine, requestHandler))
  }

  terminate () {
    this.workerPool.terminate()
  }
}

module.exports = BackendMessenger
