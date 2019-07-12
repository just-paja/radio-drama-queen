export function bench (name, method) {
  return function (...args) {
    const start = new Date()
    const state = method(...args)
    const end = new Date()
    console.log(name, end - start)
    return state
  }
}
