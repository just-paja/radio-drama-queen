const { ipcMain } = require('electron')
const { MessageListener } = require('./MessageListener')

class BackendMessenger {
  constructor (targetWindow, debug) {
    this.window = targetWindow
    this.debug = debug
    this.listeners = []
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToIpc()
  }

  handleIncomingAction (action) {
    if (action.type.includes('FAILURE')) {
      console.log('in', action.type, JSON.stringify(action))
    }
    Promise.all(
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
    this.window.webContents.send('backendSays', Object.assign({}, action, {
      timestamp: new Date()
    }))
  }

  handleAction (routine, requestHandler) {
    this.listeners.push(new MessageListener(routine, requestHandler))
  }
}

module.exports = BackendMessenger
