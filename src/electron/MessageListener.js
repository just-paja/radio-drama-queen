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

  run (action, messenger) {
    const handleError = this.getErrorHandler(action.payload)
    try {
      return this.handleRequest(action, messenger)
        .then(this.routine.success)
        .catch(handleError)
    } catch (error) {
      handleError(error)
    }
  }
}

module.exports = {
  MessageListener
}
