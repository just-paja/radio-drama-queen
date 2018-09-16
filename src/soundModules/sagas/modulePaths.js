const dirname = path => path.match(/.*\//);

export const getModuleShape = parentUrl => (module) => {
  if (typeof module === 'string') {
    return {
      name: module,
      url: `${dirname(parentUrl)}${module}/manifest.json`,
    };
  }
  return module;
};

export const getModulesStructure = (parentUrl, modules) => modules.map(getModuleShape(parentUrl));
