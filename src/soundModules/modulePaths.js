import dirname from 'path-dirname';
import URL from 'url-parse';

const MANIFEST_FILE = 'manifest.json';

const basename = path => path
  .replace(/\\/g, '/')
  .replace(/.*\//, '');

export const getHttpDirName = (path) => {
  if (path.match(/\/$/)) {
    return path;
  }
  const url = new URL(path);
  url.set('pathname', dirname(url.pathname));
  return url.pathname === '/'
    ? url.toString()
    : `${url.toString()}/`;
};

export const resolveModuleUrl = (dest, moduleName) => {
  const file = basename(dest);
  if (file.match(/\.json$/)) {
    return dest;
  }
  const url = new URL(dest);
  const append = moduleName ? `${moduleName}/${MANIFEST_FILE}` : MANIFEST_FILE;
  const dir = url.pathname.match(/\/$/) ? url.pathname : dirname(url.pathname);
  url.set('pathname', `${dir}${append}`);
  return url.toString();
};

export const getModuleShape = (parentUrl, module, moduleNameFallback) => {
  const moduleName = module.name || moduleNameFallback;
  return {
    ...module,
    name: moduleName,
    url: resolveModuleUrl(module.url || getHttpDirName(parentUrl), moduleName),
  };
};
