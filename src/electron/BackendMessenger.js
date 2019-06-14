const { ipcMain } = require('electron')

const resolveListener = (matcher, action) => {
  if (typeof matcher === 'string') {
    return action.type === matcher
  }
  if (matcher instanceof Function) {
    return Boolean(matcher(action))
  }
  return false
}

class BackendMessenger {
  constructor (targetWindow, debug) {
    this.window = targetWindow
    this.debug = debug
    this.listeners = []
    this.subscribeToIpc()
  }

  subscribeToIpc () {
    ipcMain.on('frontendSays', (event, action) => {
      if (action.type.includes('FAILURE')) {
        console.log('in', action.type, JSON.stringify(action))
      }
      this.listeners.forEach((listener) => {
        const matches = resolveListener(listener.matcher, action)
        if (matches) {
          const handleError = routine => error => this.sendMessage(
            listener.routine.failure(action.meta && action.meta.uuid, error.message)
          )
          try {
            listener.action(this, listener.routine, action).catch(handleError)
          } catch (error) {
            handleError(error)
          }
        }
      })
    })
  }

  sendMessage (action) {
    if (action.type.includes('FAILURE')) {
      console.log('out', action.type, JSON.stringify(action))
    }
    this.window.webContents.send('backendSays', action)
  }

  handleAction (matcher, routine, action) {
    this.listeners.push({ matcher, routine, action })
  };
}

module.exports = BackendMessenger
