const serializeError = require('serialize-error')

class MessageListener {
  constructor (routine, handleRequest) {
    this.handleRequest = handleRequest
    this.routine = routine
  }

  getErrorHandler (payload) {
    return error => this.routine.failure(
      payload,
      error instanceof Error ? serializeError(error) : error
    )
  }

  matchesAction (action) {
    return this.routine.REQUEST === action.type
  }

  run (app, action) {
    const handleError = this.getErrorHandler(action.payload)
    try {
      return this.handleRequest(app, action)
        .then(this.routine.success)
        .catch(handleError)
    } catch (error) {
      return Promise.resolve(handleError(error))
    }
  }
}

module.exports = {
  MessageListener
}
