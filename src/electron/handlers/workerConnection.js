export function passPayload (workerName) {
  return function (action, messenger) {
    return messenger.workerPool.exec(workerName, [action.payload])
  }
}
