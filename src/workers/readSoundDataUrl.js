const jetpack = require('fs-jetpack');

module.exports = (soundData) => {
  if (!soundData) {
    return;
  }

  return jetpack
    .readAsync(soundData.cachePath, 'buffer')
    .then(fileBuffer =>
      `data:audio/${soundData.format};base64,${fileBuffer.toString('base64')}`
    );
};
