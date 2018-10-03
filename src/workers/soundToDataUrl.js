const jetpack = require('../../node_modules/fs-jetpack');

const splitNameFromExtension = (url) => {
  const fileParts = url.split('/');
  const fileName = fileParts[fileParts.length - 1];
  const fileNameParts = fileName.split('.');
  return {
    name: fileNameParts.join('.'),
    extension: fileNameParts.length > 1 ? fileNameParts.pop() : null,
  };
};

module.exports = (data) => {
  if (!data) {
    return;
  }

  const { filePath, url } = data;

  return jetpack
    .readAsync(filePath, 'buffer')
    .then((fileBuffer) => {
      const encoded = fileBuffer.toString('base64');
      const { name, extension } = splitNameFromExtension(url);
      return {
        blob: `data:audio/${extension};base64,${encoded}`,
        filePath,
        name,
        extension,
      };
    });
};
