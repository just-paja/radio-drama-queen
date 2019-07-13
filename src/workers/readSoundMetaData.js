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

function normalizeTags (metaData) {
  const languageTags = Object.keys(metaData.native).reduce((acc, version) => {
    return acc.concat(metaData.native[version].reduce((innerAcc, header) => {
      return header.id === 'COMM'
        ? [...acc, header.value]
        : acc
    }, []))
  }, []).reduce((acc, header) => ({
    ...acc,
    [header.language]: [
      ...(acc[header.language] || []),
      ...header.text.split(',')
    ].filter(filterNonEmpty).filter(filterUnique)
  }), {})
  return Object.keys(languageTags)
    .reduce((acc, language) => acc.concat(languageTags[language].map((tagStr) => ({
      language,
      name: `${remove(tagStr.trim()).toLowerCase()}-${language}`,
      title: tagStr.trim()
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
