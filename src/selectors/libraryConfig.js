import { createSelector } from 'reselect';

export const getLibraryFsPath = createSelector(
  state => state.libraryConfig,
  config => config.fsPath
);

export const getModules = createSelector(
  state => state.libraryConfig,
  state => state.modules
);

export const getModule = createSelector(
  (state, moduleName) => state.libraryConfig.modules.find(module => module.name === moduleName),
  state => state
);

export const getLibraryConfig = state => ({
  library: {
    name: state.libraryConfig.name,
  },
  categoryList: state.categoryList,
  soundList: state.soundList.map(({ name, path, uuid }) => ({
    name,
    path,
    uuid,
  })),
});
