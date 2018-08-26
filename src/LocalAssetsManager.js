const http = global.require('http');
const fs = global.require('fs');
const electron = global.require('electron');
const jetpack = global.require('fs-jetpack');

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

class LocalAssetsManager {
  constructor() {
    this.downloadSound = this.downloadSound.bind(this);
    this.home = electron.remote.app.getPath('userData');
    this.ensureCacheDirExistence();
  }

  getCachePath() {
    return jetpack.path(this.home, 'cache');
  }

  getSoundPath(uuid, url) {
    const { extension } = splitNameFromExtension(url);
    return jetpack.path(this.getCachePath(), `${uuid}.${extension || 'sound'}`);
  }

  ensureCacheDirExistence() {
    return jetpack.dirAsync(this.getCachePath());
  }

  downloadSound(uuid, url) {
    const cachePath = this.getSoundPath(uuid, url);
    return new Promise((resolve, reject) => {
      if (jetpack.exists(cachePath) === 'file') {
        resolve();
      } else {
        const file = fs.createWriteStream(cachePath);
        http.get(url, (response) => {
          response.on('end', () => resolve());
          response.pipe(file);
        }).on('error', error => reject(error));
      }
    }).then(() => getFileDescriptor(cachePath, url));
  }
}

const localAssetsManager = new LocalAssetsManager();

export default localAssetsManager;

export const { downloadSound } = localAssetsManager;
