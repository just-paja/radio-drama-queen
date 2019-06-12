const ipcRenderer = global.require && global.require('electron').ipcRenderer

export default (store) => {
  if (ipcRenderer) {
    ipcRenderer.on('backendSays', (event, data) => {
      store.dispatch(data)
    })
  }
}
