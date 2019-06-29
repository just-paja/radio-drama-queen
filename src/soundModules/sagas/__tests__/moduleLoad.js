import sagas from '../moduleLoad'

import { getSagaTester } from '../../../mock'
import { soundModule } from '../../actions'

import * as localAssetsManager from '../../../LocalAssetsManager'

describe('moduleLoad saga', () => {
  beforeEach(() => {
    jest.spyOn(localAssetsManager, 'downloadConfig').mockImplementation()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllMocks()
    jest.useRealTimers()
  })

  it('starts loading module on load trigger', () => {
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'root',
            url: 'http://example.com/tiny.json'
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundModule.loadTrigger(['root']))
    expect(sagaTester.getCalledActions()).toContainEqual(soundModule.loadRequest('root'))
  })

  it('saves module config on load success', () => {
    localAssetsManager.downloadConfig.mockImplementation(() => Promise.resolve({
      name: 'studio-test',
      url: 'http://example.com/module.json',
      modules: [
        'alarms'
      ],
      tags: [
        {
          name: 'ambient',
          title: {
            en: 'Ambient',
            cs: 'Prostředí'
          }
        }
      ]
    }))
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'root',
            url: 'http://example.com/tiny.json'
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundModule.loadTrigger('root'))
    return sagaTester.waitFor(soundModule.LOAD_FULFILL)
      .then(() => {
        expect(sagaTester.getState().soundModules.list).toContainEqual({
          name: 'root',
          loading: false,
          url: 'http://example.com/module.json',
          modules: [
            'alarms'
          ],
          tags: [
            {
              name: 'ambient',
              title: {
                en: 'Ambient',
                cs: 'Prostředí'
              }
            }
          ]
        })
      })
  })

  it('saves module error on load failure', () => {
    const testError = new Error('Test!')
    localAssetsManager.downloadConfig.mockImplementation(() => Promise.reject(testError))
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'root',
            url: 'http://example.com/tiny.json'
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundModule.loadTrigger('root'))
    return sagaTester.waitFor(soundModule.LOAD_FULFILL)
      .then(() => {
        expect(sagaTester.getState().soundModules.list).toContainEqual({
          name: 'root',
          loading: false,
          url: 'http://example.com/tiny.json',
          error: testError
        })
      })
  })

  it('adds modules to the loading queue', () => {
    localAssetsManager.downloadConfig.mockImplementationOnce(() => new Promise((resolve) => {
      setTimeout(() => resolve({
        name: 'studio-test1',
        modules: [
          'alarms'
        ]
      }), 1000)
    }))
    localAssetsManager.downloadConfig.mockImplementationOnce(() => new Promise((resolve) => {
      setTimeout(() => resolve({
        name: 'studio-test2',
        modules: [
          'aliens'
        ]
      }), 1000)
    }))
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'studio-test1',
            url: 'http://example.com/tiny1.json'
          },
          {
            name: 'studio-test2',
            url: 'http://example.com/tiny2.json'
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundModule.loadTrigger('studio-test1'))
    jest.runTimersToTime(500)
    sagaTester.dispatch(soundModule.loadTrigger('studio-test2'))
    jest.runTimersToTime(2000)
    return sagaTester.waitFor(soundModule.LOAD_FULFILL)
      .then(() => {
        expect(sagaTester.getState().soundModules.list).toContainEqual({
          name: 'studio-test1',
          loading: false,
          url: 'http://example.com/tiny1.json',
          modules: [
            'alarms'
          ]
        })
        expect(sagaTester.getState().soundModules.list).toContainEqual({
          name: 'studio-test2',
          loading: false,
          url: 'http://example.com/tiny2.json',
          modules: [
            'aliens'
          ]
        })
      })
  })

  it('does not load non-existent modules', () => {
    const sagaTester = getSagaTester({
      soundModules: {
        list: [
          {
            name: 'studio-test1',
            url: 'http://example.com/tiny1.json'
          }
        ]
      }
    })
    sagaTester.runAll(sagas)
    sagaTester.dispatch(soundModule.loadTrigger('studio-test2'))
    expect(localAssetsManager.downloadConfig).not.toHaveBeenCalled()
  })
})
