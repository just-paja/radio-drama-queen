const iso639 = require('iso-639-1')
const musicMetadata = require('music-metadata')
const workerpool = require('workerpool')
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
  return formatStr.toLowerCase()
}

function normalizeName (soundData, metaData) {
  if (metaData.common.title) {
    return metaData.common.title
  }
  return path.basename(soundData.path)
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
    return header.value.text || header.value
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

workerpool.worker({
  readSoundMetaData: (soundData) => {
    if (!soundData) {
      return Promise.reject(new Error('You must pass some sound data'))
    }

    return musicMetadata.parseFile(soundData.cachePath, {
      native: true,
      skipCovers: true
    }).then(data => ({
      ...soundData,
      duration: data.format.duration,
      format: normalizeFormat(data.format.codec),
      name: normalizeName(soundData, data),
      tags: normalizeTags(data)
    }))
  }
})
