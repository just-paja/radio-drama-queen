import sagas from '..'

import { getSagaTester } from '../../../mock'
import { moduleRoutines } from '../../actions'

import * as localAssetsManager from '../../../LocalAssetsManager'

describe('moduleResources saga', () => {
  beforeEach(() => {
    jest.spyOn(localAssetsManager, 'downloadConfig').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('adds submodules to the database', () => {
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'studio-test',
            url: 'http://example.com/module.json',
            modules: ['foo']
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundModule.loadSuccess('studio-test'))
    expect(sagaTester.getState().soundModules.list).toContainEqual(expect.objectContaining({
      name: 'foo',
      url: 'http://example.com/foo/manifest.json',
      loading: false
    }))
  })

  it('triggers all submodules loading', () => {
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'studio-test',
            url: 'http://example.com/module.json',
            modules: ['foo', 'bar']
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundModule.loadSuccess('studio-test'))
    expect(sagaTester.getCalledActions()).toContainEqual(soundModule.loadTrigger(['foo', 'bar']))
  })

  it('loads submodules of submodules loading', () => {
    localAssetsManager.downloadConfig.mockImplementationOnce(() => Promise.resolve({
      name: 'foo',
      modules: ['bar']
    }))
    localAssetsManager.downloadConfig.mockImplementationOnce(() => Promise.resolve({
      name: 'bar',
      tags: [
        {
          name: 'barTag'
        }
      ]
    }))
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'studio-test',
            url: 'http://example.com/module.json',
            modules: ['foo']
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundModule.loadSuccess('studio-test'))
    return sagaTester.waitFor(soundModule.LOAD_FULFILL)
      .then(() => {
        expect(sagaTester.getCalledActions()).toContainEqual(soundModule.loadTrigger(['foo']))
        expect(localAssetsManager.downloadConfig).toHaveBeenCalledWith('http://example.com/foo/manifest.json')
        expect(sagaTester.getCalledActions()).toContainEqual(soundModule.loadTrigger(['bar']))
        expect(localAssetsManager.downloadConfig).toHaveBeenCalledWith('http://example.com/foo/bar/manifest.json')
      })
  })
})
