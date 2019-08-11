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

const EXTENSION_MODULE = 'rdqm'
const EXTENSION_STORY = 'rdqs'
const MANIFEST_FILE = `manifest.${EXTENSION_MODULE}`

const soundExtensions = [
  '.mp3',
  '.ogg'
]

const moduleIgnore = [
  'node_modules'
]

module.exports = {
  DRIVER_LOCAL,
  DRIVER_OPTIONS,
  DRIVER_REMOTE,
  moduleIgnore,
  EXTENSION_MODULE,
  EXTENSION_STORY,
  MANIFEST_FILE,
  soundExtensions
}
