export function sendState (app, action) {
  return Promise.resolve(app.getState())
}
