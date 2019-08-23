export function getState(action, messenger) {
  return Promise.resolve(messenger.getState())
}
