import { all, put, takeEvery } from 'redux-saga/effects'
import { moduleRoutines } from '../actions'
import { soundRoutines } from '../../sounds'

function * handleModuleLoadSuccess () {
  yield takeEvery(moduleRoutines.load.SUCCESS, function * integrateModuleResources ({ payload }) {
    const { modules, sounds } = payload
    yield all(modules.map(submodule => put(moduleRoutines.load(submodule))))
    yield all(sounds.map(sound => put(soundRoutines.register(sound))))
  })
}

export default [
  handleModuleLoadSuccess
]
