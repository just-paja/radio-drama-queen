export function firstArg (action) {
  return function (arg) {
    return action(arg)
  }
}

export function noArgs (action) {
  return function () {
    return action()
  }
}
