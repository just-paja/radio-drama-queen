const iso639 = require('iso-639-1')
const musicMetadata = require('music-metadata')
const path = require('path')

const { remove } = require('diacritics')

function filterNonEmpty (item) {
  return Boolean(item)
}

function filterUnique (item, index, src) {
  return src.indexOf(item) === index
}

function normalizeFormat (formatStr) {
  if (!formatStr) {
    throw new Error('Unrecognized format')
  }
  if (formatStr === 'MP1') {
    return 'mp3'
  }
  if (formatStr.indexOf('vorbis') !== -1) {
    return 'ogg'
  }
  return formatStr.toLowerCase()
}

function removeExt (fileName) {
  return fileName.replace(/\.[^/.]+$/, '')
}

function normalizeName (soundData, metaData) {
  return metaData.common.title || removeExt(path.basename(soundData.path))
}

function normalizeLanguage (header) {
  if (!header || !header.value || !header.value.language || header.value.language === 'XXX') {
    return 'eng'
  }
  const lang = header.value.language.toLowerCase()
  return iso639.getName(lang)
    ? lang
    : 'eng'
}

function normalizeHeaderValue (header) {
  if (header && header.value) {
    return typeof header.value.text !== 'undefined'
      ? header.value.text
      : header.value
  }
  return ''
}

const COMMENT_TAGS = ['COMM', 'TXXX', 'TXXX:COMM', 'comment', 'TIT1']

function normalizeTags (metaData) {
  const languageTags = Object
    .keys(metaData.native)
    .reduce(
      (acc, version) => acc.concat(metaData.native[version]
        .filter(header => COMMENT_TAGS.indexOf(header.id) !== -1))
      , []
    ).reduce((acc, header) => {
      const value = normalizeHeaderValue(header)
      const language = normalizeLanguage(header)
      return {
        ...acc,
        [language]: [
          ...(acc[language] || []),
          ...value.split(',')
        ].map(str => str.trim()).filter(filterNonEmpty).filter(filterUnique)
      }
    }, {})
  return Object.keys(languageTags)
    .reduce((acc, language) => acc.concat(languageTags[language].map((tagStr) => ({
      language,
      name: `${remove(tagStr).toLowerCase()}-${language}`,
      title: tagStr
    }))), [])
}

function readSoundMetaData (config, soundData) {
  if (!soundData) {
    return Promise.reject(new Error('You must pass some sound data'))
  }

  return musicMetadata.parseFile(soundData.cachePath || soundData.path, {
    native: true,
    skipCovers: true
  }).then(function (data) {
    return {
      ...soundData,
      duration: data.format.duration,
      format: normalizeFormat(data.format.codec),
      name: normalizeName(soundData, data),
      tags: normalizeTags(data)
    }
  })
}

module.exports = {
  readSoundMetaData
}
