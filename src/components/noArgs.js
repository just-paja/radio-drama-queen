export function noArgs (action) {
  return function () {
    return action()
  }
}
