const path = require('path')
const mediatags = require('jsmediatags')
const workerpool = require('workerpool')

const { remove } = require('diacritics')

const reduceTags = (aggr, item) => {
  if (!item || !item.data) {
    return []
  }
  const language = item.data.language === 'XXX' ? 'eng' : item.data.language
  return [
    ...aggr,
    ...item.data.text.split(',').map(tag => ({
      language,
      name: `${remove(tag.trim()).toLowerCase()}-${language}`,
      title: tag.trim()
    }))
  ]
}

const normalizeTags = (tags) => {
  const tagArray = tags instanceof Array
    ? tags
    : [tags]
  return tagArray.reduce(reduceTags, [])
}

workerpool.worker({
  readSoundMetaData: (soundData) => {
    if (!soundData) {
      return
    }

    return new Promise((resolve, reject) => {
      try {
        mediatags.read(soundData.cachePath, {
          onError: reject,
          onSuccess: (data) => {
            const format = path.extname(soundData.path).substr(1)
            resolve(Object.assign({}, soundData, {
              format: format,
              name: data.tags.title || path.basename(soundData.path),
              tags: normalizeTags(data.tags.COMM)
            }))
          }
        })
      } catch (err) {
        reject(err)
      }
    })
  }
})
