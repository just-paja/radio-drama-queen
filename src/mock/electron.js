class PubSub {
  handlers = []

  on (channel, resolve) {
    this.handlers.push(resolve)
  }

  async send (channel, ...args) {
    // console.log('SEND', channel, args, this.handlers)
    for (const handler of this.handlers) {
      await handler(...args)
    }
  }
}

class WebContents extends PubSub {}

class IPC extends PubSub {}

module.exports = {
  ipcMain: new IPC(),
  BrowserWindow: class MockWindow {
    static open () {
      return new MockWindow()
    }

    close = jest.fn()
    removeMenu = jest.fn()
    loadURL = jest.fn().mockImplementation(() => Promise.resolve())
    webContents = new WebContents()
  }
}
