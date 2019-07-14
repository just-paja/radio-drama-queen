const FORM_LIBRARY_OPEN = 'FORM_LIBRARY_OPEN'

const DRIVER_LOCAL = 'local'
const DRIVER_REMOTE = 'remote'

const DRIVER_OPTIONS = [
  {
    label: 'Local',
    value: DRIVER_LOCAL
  },
  {
    label: 'Remote',
    value: DRIVER_REMOTE
  }
]

module.exports = {
  DRIVER_LOCAL,
  DRIVER_OPTIONS,
  DRIVER_REMOTE,
  FORM_LIBRARY_OPEN
}
