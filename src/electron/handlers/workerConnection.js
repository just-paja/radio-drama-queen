export function passPayload (workerName) {
  return function (app, action) {
    return app.workOn(workerName, action.payload)
  }
}
