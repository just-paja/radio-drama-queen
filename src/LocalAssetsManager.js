import hash from 'hash.js';

let fs;
let electron;
let jetpack;
let request;

const loadDependencies = () => {
  if (global.require) {
    fs = global.require('fs');
    electron = global.require('electron');
    jetpack = global.require('fs-jetpack');
    request = global.require('request');
  }
};

const splitNameFromExtension = (url) => {
  const fileParts = url.split('/');
  const fileName = fileParts[fileParts.length - 1];
  const fileNameParts = fileName.split('.');
  return {
    name: fileNameParts.join('.'),
    extension: fileNameParts.length > 1 ? fileNameParts.pop() : null,
  };
};

const getFileDescriptor = (cachePath, url) => jetpack
  .readAsync(cachePath, 'buffer')
  .then((fileBuffer) => {
    const encoded = fileBuffer.toString('base64');
    const { name, extension } = splitNameFromExtension(url);
    return {
      blob: `data:audio/${extension};base64,${encoded}`,
      cachePath,
      name,
      extension,
    };
  });

const cacheFile = (url, cachePath) => {
  if (!fs) {
    return Promise.reject(new Error('Not available in this environment'));
  }
  if (jetpack.exists(cachePath) === 'file' && !cachePath.match(/\.json$/)) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    let res;
    const stream = fs.createWriteStream(cachePath);
    const failAndCleanUp = (error) => {
      stream.close();
      return jetpack.removeAsync(cachePath)
        .then(() => reject(error))
        .catch(reject);
    };
    request(url)
      .on('response', (response) => {
        res = response;
      })
      .pipe(stream)
      .on('finish', () => {
        if (!res) {
          failAndCleanUp(new Error(`Did not get any response! ${url}`));
        } else if (res.statusCode < 200 || res.statusCode > 299) {
          failAndCleanUp(new Error(`Server returned status code ${res.statusCode}! ${url}`));
        } else {
          resolve();
        }
      })
      .on('error', failAndCleanUp);
  });
};

const getPath = (...args) => {
  if (electron) {
    return electron.remote.app.getPath(...args);
  }
  return null;
};

class LocalAssetsManager {
  constructor() {
    this.downloadSound = this.downloadSound.bind(this);
    this.downloadConfig = this.downloadConfig.bind(this);
    loadDependencies();
    this.home = getPath('userData');
  }

  getCachePath() {
    return jetpack.path(this.home, 'cache');
  }

  getConfigPath(url) {
    const sum = hash.sha256().update(url).digest('hex');
    return jetpack.path(this.getCachePath(), `${sum}.json`);
  }

  getSoundPath(url) {
    const { extension } = splitNameFromExtension(url);
    const sum = hash.sha256().update(url).digest('hex');
    return jetpack.path(this.getCachePath(), `${sum}.${extension}`);
  }

  ensureCacheDirExistence() {
    if (fs) {
      return jetpack.dirAsync(this.getCachePath());
    }
    return Promise.reject(new Error('Not available in this environment'));
  }

  downloadConfig(url) {
    const cachePath = this.getConfigPath(url);
    return this.ensureCacheDirExistence()
      .then(() => cacheFile(url, cachePath))
      .then(() => jetpack.readAsync(cachePath, 'json'));
  }

  downloadSound(uuid, url) {
    const cachePath = this.getSoundPath(url);
    return this.ensureCacheDirExistence()
      .then(() => cacheFile(url, cachePath))
      .then(() => getFileDescriptor(cachePath, url));
  }
}

const localAssetsManager = new LocalAssetsManager();

export default localAssetsManager;

export const { downloadSound, downloadConfig } = localAssetsManager;
