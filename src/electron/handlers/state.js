export function getState (app, action) {
  const { entities, soundWorkspaces } = app.state
  return Promise.resolve({ entities, soundWorkspaces })
}
