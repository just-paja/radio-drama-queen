import { createSelector } from 'reselect';

export const getLibraryFsPath = createSelector(
  state => state.libraryConfig,
  config => config.fsPath
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
