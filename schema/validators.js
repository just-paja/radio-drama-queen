const jetpack = require('fs-jetpack')
const path = require('path')
const SoundModule = require('./SoundModule')

const { MANIFEST_FILE, EXTENSION_MODULE } = require('../src/electron/libraries/constants')
const { Validator } = require('jsonschema')

const objects = [
  require('./ObjectName'),
  require('./SoundUrl'),
  require('./SoundModuleUrl'),
  require('./SoundTag'),
  require('./SoundUrl'),
  require('./Translations'),
  SoundModule
]

function getValidator () {
  const validator = new Validator()
  objects.forEach(object => validator.addSchema(object, object.id))
  return validator
}

function validateModule (mod) {
  const result = getValidator().validate(mod, SoundModule)
  return result.errors
}

function getModulePath (parentUrl, moduleUrl) {
  return path.join(parentUrl, moduleUrl, MANIFEST_FILE)
}

const testModuleExtension = new RegExp(`.${EXTENSION_MODULE}$`)

function validateDeep (file, parentName) {
  const base = path.dirname(file)
  const dirName = path.basename(base)
  const mod = jetpack.read(file, 'json')
  const modName = parentName ? `${parentName}/${dirName}` : (mod ? mod.name : path.basename(dirName))
  if (!mod) {
    if (!parentName) {
      throw new Error(`Source file "${file}" was not found`)
    }
    return [
      {
        message: `"${path.basename(file)}" was not found`,
        instance: {
          name: modName
        }
      }
    ]
  }
  mod.name = modName
  let errors = validateModule(mod)
  if (!file.match(testModuleExtension)) {
    errors.unshift({
      message: `"${path.basename(file)}" does not have radio drama queen extension: ${EXTENSION_MODULE}`,
      instance: {
        name: modName
      }
    })
  }
  if (mod.modules) {
    errors = mod.modules.reduce(
      (acc, moduleName) => acc.concat(validateDeep(getModulePath(base, moduleName), modName)),
      errors
    )
  }
  return errors
}

module.exports = {
  validateDeep,
  validateModule
}
