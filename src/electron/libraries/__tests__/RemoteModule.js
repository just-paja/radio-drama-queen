import { RemoteModule } from '..'
import { createFixtureServer } from '../../../mock'

describe('RemoteModule driver', () => {
  let testServer = null

  beforeAll(() => createFixtureServer(__dirname, 'fixtures').then((server) => {
    testServer = server
  }))

  afterAll(() => testServer.close())

  it('readLibrary reads module as a library', () => {
    return RemoteModule.readLibrary({
      url: testServer.getFixtureUrl('manifest', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('name', 'Manifest Test Module')
    })
  })

  it('readModule returns remote driver', () => {
    return RemoteModule.readModule({
      url: testServer.getFixtureUrl('manifest', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('driver', 'remote')
    })
  })

  it('readModule returns module URL', () => {
    return RemoteModule.readModule({
      url: testServer.getFixtureUrl('manifest', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('url', testServer.getFixtureUrl('manifest', 'manifest.rdqm'))
    })
  })

  it('readModule returns null parent given it is a root module', () => {
    return RemoteModule.readModule({
      url: testServer.getFixtureUrl('manifest', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('parent', null)
    })
  })

  it('readModule returns list of sounds', () => {
    return RemoteModule.readModule({
      url: testServer.getFixtureUrl('manifest', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('sounds', [
        expect.objectContaining({
          path: testServer.getFixtureUrl('manifest', 'format.mp3')
        })
      ])
    })
  })

  it('readModule returns empty list of sounds given it is not provided', () => {
    return RemoteModule.readModule({
      url: testServer.getFixtureUrl('manifest-no-sounds', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('sounds', [])
    })
  })

  it('readModule returns list of modules', () => {
    return RemoteModule.readModule({
      url: testServer.getFixtureUrl('nested', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('modules', [
        expect.objectContaining({
          url: testServer.getFixtureUrl('nested', 'more-silence', 'manifest.rdqm')
        }),
        expect.objectContaining({
          url: testServer.getFixtureUrl('nested', 'silence', 'manifest.rdqm')
        })
      ])
    })
  })
})
