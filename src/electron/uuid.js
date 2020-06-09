const { v4 } = require('uuid')

module.exports = {
  generateUuid () {
    return v4()
  }
}
