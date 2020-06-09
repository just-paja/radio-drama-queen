const path = require('path')
const fetch = require('node-fetch').default
const fs = require('./fs')

async function fetchFile (cachePath, url) {
  const res = await fetch(url)
  if (!res) {
    throw new Error(`Did not get any response! ${url}`)
  } else if (res.statusCode < 200 || res.statusCode > 299) {
    throw new Error(`Server returned status code ${res.statusCode}! ${url}`)
  }
  try {
    await fs.mkdir(path.dirname(cachePath), { recursive: true })
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error
    }
  }
  return await new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(cachePath)
    res.body.pipe(stream)
    stream.on('close', () => resolve(cachePath))
    stream.on('error', reject)
  })
}

async function cacheFile (cachePath, url) {
  try {
    await fs.access(cachePath, fs.constants.R_OK)
  } catch (e) {
    await fetchFile(cachePath, url)
  }
  return cachePath
}

module.exports = {
  cacheFile
}
