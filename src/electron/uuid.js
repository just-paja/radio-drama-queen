const { v5 } = require('uuid')

module.exports = {
  generateUuid () {
    return v5('radio-drama-queen.com', v5.DNS)
  }
}
