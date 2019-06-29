import { all, call, put, takeEvery, select } from 'redux-saga/effects'
import { getHttpDirName, getModuleShape } from '../modulePaths'
import { moduleRoutines } from '../actions'
import { moduleStore } from '../store'
import { soundRoutines } from '../../sounds'

function * registerModuleSounds ({ payload: { name: moduleName } }) {
  const module = yield select(moduleStore.getFirst, moduleName)
  if (module && module.sounds && module.sounds.length !== 0) {
    const { sounds, url } = module
    yield all(sounds.map(soundPath => put(soundRoutines.register({
      path: `${getHttpDirName(url)}${soundPath}`
    }))))
  }
}

function * loadSubModules ({ payload: { name: moduleName } }) {
  const module = yield select(moduleStore.getFirst, moduleName)
  const submodules = module.modules
  if (submodules && submodules.length !== 0) {
    yield all(submodules.map(submodule => put(moduleRoutines.load.success(getModuleShape(
      module.url,
      {
        name: submodule,
        baseTags: [
          module.baseTag,
          ...(module.baseTags ? module.baseTags : [])
        ].filter(tag => tag)
      },
      submodule
    )))))
    yield put(moduleRoutines.load(submodules))
  }
}

function * integrateModuleResources (action) {
  yield call(loadSubModules, action)
  yield call(registerModuleSounds, action)
}

function * handleModuleLoadSuccess () {
  yield takeEvery(moduleRoutines.load.SUCCESS, integrateModuleResources)
}

export default [
  handleModuleLoadSuccess
]
