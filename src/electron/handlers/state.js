export function getState (app, action) {
  return Promise.resolve(app.getState())
}
