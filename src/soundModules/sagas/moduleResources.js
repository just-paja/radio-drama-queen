import {
  all,
  call,
  put,
  takeEvery,
  select
} from 'redux-saga/effects'

import { soundModule } from '../actions'
import { getModule } from '../selectors'
import { soundRegister } from '../../sounds/actions'
import { getHttpDirName, getModuleShape } from '../modulePaths'

function * registerModuleSounds ({ meta: { name: moduleName } }) {
  const module = yield select(getModule, moduleName)
  if (module && module.sounds && module.sounds.length !== 0) {
    const { sounds, url } = module
    yield all(sounds.map(soundPath => put(soundRegister.trigger(null, {
      path: `${getHttpDirName(url)}${soundPath}`
    }))))
  }
}

function * loadSubModules ({ meta: { name: moduleName } }) {
  const module = yield select(getModule, moduleName)
  const submodules = module.modules
  if (submodules && submodules.length !== 0) {
    yield all(submodules.map(submodule => put(soundModule.add(getModuleShape(
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
    yield put(soundModule.loadTrigger(submodules))
  }
}

function * integrateModuleResources (action) {
  // yield call(registerModuleTags, action);
  yield call(loadSubModules, action)
  yield call(registerModuleSounds, action)
}

function * handleModuleLoadSuccess () {
  yield takeEvery(soundModule.LOAD_SUCCESS, integrateModuleResources)
}

export default [
  handleModuleLoadSuccess
]
