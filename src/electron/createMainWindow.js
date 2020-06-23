const { BrowserWindow } = require('electron')
const { createLogger, transports } = require('winston')
const { startBackend } = require('./api')

const align = require('logform/align')
const colorize = require('logform/colorize')
const combine = require('logform/combine')
const json = require('logform/json')
const printf = require('logform/printf')
const timestamp = require('logform/timestamp')

export function createMainWindow (development) {
  const logger = createLogger({
    level: development ? 'debug' : 'error',
    transports: [
      new transports.Console({
        format: combine(
          colorize({
            colors: {
              debug: 'cyan',
              info: 'blue',
              notice: 'blue',
              warning: 'yellow',
              error: 'red',
              crit: 'brightRed',
              alert: 'brightRed',
              emerg: 'brightRed'
            }
          }),
          timestamp(),
          printf(info => {
            if (!info.message || !info.message.type) {
              return JSON.stringify(info.message, undefined, 2)
            }
            const header = `[${info.level}] ${info.client}:${info.message.type}`
            const body = JSON.stringify(info.message, undefined, 2)
            return info.message.type.includes('FAILURE') ? `${header} ${body}` : header
          }),
          align(),
        )
      })
    ]
  })

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

  startBackend(mainWindow, logger)

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
