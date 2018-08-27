import hash from 'hash.js';

const fs = global.require('fs');
const electron = global.require('electron');
const jetpack = global.require('fs-jetpack');
const request = global.require('request');

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
  if (jetpack.exists(cachePath) === 'file') {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const stream = request.get(url).pipe(fs.createWriteStream(cachePath));
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
};

class LocalAssetsManager {
  constructor() {
    this.downloadSound = this.downloadSound.bind(this);
    this.downloadConfig = this.downloadConfig.bind(this);
    this.home = electron.remote.app.getPath('userData');
    this.ensureCacheDirExistence();
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
    return jetpack.dirAsync(this.getCachePath());
  }

  downloadConfig(url) {
    const cachePath = this.getConfigPath(url);
    return cacheFile(url, cachePath)
      .then(() => jetpack.readAsync(cachePath, 'json'));
  }

  downloadSound(uuid, url) {
    const cachePath = this.getSoundPath(url);
    return cacheFile(url, cachePath)
      .then(() => getFileDescriptor(cachePath, url));
  }
}

const localAssetsManager = new LocalAssetsManager();

export default localAssetsManager;

export const { downloadSound, downloadConfig } = localAssetsManager;
