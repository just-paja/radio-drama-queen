const path = require('path');

const { BrowserWindow } = require('electron');

const BackendMessenger = require('./BackendMessenger');
const handlers = require('./handlers');
const SoundManager = require('./SoundManager');

const { soundRead, soundRegister } = require('../sounds/actions');

module.exports = (development) => {
  const mainWindow = new BrowserWindow({
    height: 600,
    icon: path.join(__dirname, '..', 'public', 'favicon.png'),
    minHeight: 320,
    minWidth: 320,
    title: 'Radio Drama Queen',
    width: 960,
  });

  const messenger = new BackendMessenger(mainWindow, development);
  const soundManager = new SoundManager();

  messenger.handleAction(soundRegister.REQUEST, soundRegister, handlers.soundRegister(soundManager));
  messenger.handleAction(soundRead.REQUEST, soundRead, handlers.soundRead(soundManager));

  // TODO: Handle sound load
  // TODO: Handle sound unload
  // TODO: Handle sound play
  // TODO: Handle sound stop
  // TODO: Handle sound volume change
  // TODO: Handle sound mute
  // TODO: Handle sound unmute

  mainWindow.setMenu(null);
  mainWindow.setFullScreenable(true);

  if (development) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
  }

  return mainWindow;
}
