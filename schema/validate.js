const { validateDeep } = require('./validators')

const errors = validateDeep(process.argv[2])

errors.forEach(error => {
  process.stderr.write(`[${error.instance.name}]: ${error.message}\n`)
})
