import electron from 'electron'
import jetpack from 'fs-jetpack'

export const isLocalPath = path => path.indexOf('file:') === 0

export const removeLocalProtocol = path => path.substr(7)

export const splitNameFromExtension = (url) => {
  const fileParts = url.split('/')
  const fileName = fileParts[fileParts.length - 1]
  const fileNameParts = fileName.split('.')
  return {
    name: fileNameParts.join('.'),
    extension: fileNameParts.length > 1 ? fileNameParts.pop() : null
  }
}

export const getPath = (...args) => {
  if (electron) {
    return electron.app.getPath(...args)
  }
  return '/var/tmp'
}

export const PATH_STORIES = jetpack.path(getPath('userData'), 'Stories')
export const PATH_CACHE = jetpack.path(getPath('userData'), 'Cache')
export const PATH_EXE = getPath('exe')
export const PATH_WORKERS = jetpack.path(PATH_EXE, 'src', 'workers')
