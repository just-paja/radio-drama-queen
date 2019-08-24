const { BrowserWindow } = require('electron')
const { startBackend } = require('./api')

export function createMainWindow (development) {
  const mainWindow = new BrowserWindow({
    height: 600,
    // icon: path.join(__dirname, '..', 'public', 'favicon.png'),
    minHeight: 320,
    minWidth: 320,
    title: 'Radio Drama Queen',
    width: 960,
    webPreferences: {
      nodeIntegration: true
    }
  })

  startBackend(mainWindow, development)

  mainWindow.removeMenu()
  mainWindow.setMenuBarVisibility(false)
  mainWindow.setFullScreenable(true)

  if (development) {
    mainWindow.webContents.openDevTools()
  }

  // eslint-disable-next-line no-undef
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)
  return mainWindow
}
