const RDQ_EXTENSION_MODULE = 'rdqm'
const RDQ_EXTENSION_STORY = 'rdqs'
const RDQ_MANIFEST_FILE = `manifest.${RDQ_EXTENSION_MODULE}`

const soundExtensions = [
  '.mp3',
  '.ogg'
]

const moduleIgnore = [
  'node_modules'
]

module.exports = {
  moduleIgnore,
  RDQ_EXTENSION_MODULE,
  RDQ_EXTENSION_STORY,
  RDQ_MANIFEST_FILE,
  soundExtensions
}
