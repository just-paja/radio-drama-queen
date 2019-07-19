class MessageListener {
  constructor (routine, handleRequest) {
    this.handleRequest = handleRequest
    this.routine = routine
  }

  getErrorHandler (payload) {
    return error => this.routine.failure(error)
  }

  matchesAction (action) {
    return this.routine.REQUEST === action.type
  }

  run (action) {
    const handleError = this.getErrorHandler(action.payload)
    try {
      return this.handleRequest(action)
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
