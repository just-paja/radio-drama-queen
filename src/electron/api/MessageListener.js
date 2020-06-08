const { serializeError } = require('serialize-error')

class MessageListener {
  constructor (routine, handleRequest) {
    this.handleRequest = handleRequest
    this.routine = routine
  }

  handleError (error, payload) {
    return this.routine.failure(serializeError(error), payload)
  }

  matchesAction (action) {
    return this.routine.REQUEST === action.type
  }

  async run (app, action) {
    try {
      return this.routine.success(await this.handleRequest(app, action))
    } catch (error) {
      return this.handleError(error, action.payload)
    }
  }
}

module.exports = {
  MessageListener
}
