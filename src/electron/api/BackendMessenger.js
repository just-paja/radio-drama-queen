const { ipcMain } = require('electron')
const { MessageListener } = require('./MessageListener')

class BackendMessenger {
  constructor (app) {
    this.app = app
    this.listeners = []
    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToIpc()
  }

  handleIncomingAction (action) {
    if (action.type.includes('FAILURE')) {
      console.log('in', action.type, JSON.stringify(action))
    }
    this.app.store.dispatch(action)
    return Promise.all(
      this.listeners
        .filter(listener => listener.matchesAction(action))
        .map(listener => listener.run(this.app, action))
    ).then(results => results.map(this.sendMessage))
  }

  subscribeToIpc () {
    ipcMain.on('frontendSays', (event, action) => this.handleIncomingAction(action))
  }

  sendMessage (action) {
    if (action.type.includes('FAILURE')) {
      console.log('out', action.type, JSON.stringify(action))
    }
    this.app.dispatch(action)
    this.app.mainWindow.webContents.send('backendSays', Object.assign({}, action, {
      timestamp: new Date()
    }))
    return action
  }

  handleRequest (routine, requestHandler) {
    this.listeners.push(new MessageListener(routine, requestHandler))
  }
}

module.exports = BackendMessenger