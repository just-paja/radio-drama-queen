const ipcRenderer = global.require('electron').ipcRenderer;

export default (store) => {
  ipcRenderer.on('backendSays', (event, data) => {
    store.dispatch(data);
  });
};
