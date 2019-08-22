import { RemoteModule } from '..'
import createTestServer from 'create-test-server'
import jetpack from 'fs-jetpack'

describe('RemoteModule driver', () => {
  let testServer = null

  function getFixtureDirectory (...dirPath) {
    return jetpack.path(__dirname, 'fixtures', ...dirPath)
  }

  function getFixtureUrl (...fixturePath) {
    return `${testServer.url}/${fixturePath.join('/')}`
  }

  beforeAll(() => createTestServer().then((server) => {
    testServer = server
    server.get('*', (req, res) => {
      const path = req.path.match(/\/$/) ? jetpack.path(req.path, 'manifest.rdqm') : req.path
      return jetpack.read(getFixtureDirectory(...path.split('/').filter(item => item)))
    })
  }))

  afterAll(() => testServer.close())

  it('readLibrary reads module as a library', () => {
    return RemoteModule.readLibrary({
      url: getFixtureUrl('manifest', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('name', 'Manifest Test Module')
    })
  })

  it('readModule returns remote driver', () => {
    return RemoteModule.readModule({
      url: getFixtureUrl('manifest', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('driver', 'remote')
    })
  })

  it('readModule returns module URL', () => {
    return RemoteModule.readModule({
      url: getFixtureUrl('manifest', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('url', getFixtureUrl('manifest', 'manifest.rdqm'))
    })
  })

  it('readModule returns null parent given it is a root module', () => {
    return RemoteModule.readModule({
      url: getFixtureUrl('manifest', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('parent', null)
    })
  })

  it('readModule returns list of sounds', () => {
    return RemoteModule.readModule({
      url: getFixtureUrl('manifest', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('sounds', [
        expect.objectContaining({
          path: getFixtureUrl('manifest', 'format.mp3')
        })
      ])
    })
  })

  it('readModule returns empty list of sounds given it is not provided', () => {
    return RemoteModule.readModule({
      url: getFixtureUrl('manifest-no-sounds', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('sounds', [])
    })
  })

  it('readModule returns list of modules', () => {
    return RemoteModule.readModule({
      url: getFixtureUrl('nested', 'manifest.rdqm')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('modules', [
        expect.objectContaining({
          url: getFixtureUrl('nested', 'more-silence', 'manifest.rdqm')
        }),
        expect.objectContaining({
          url: getFixtureUrl('nested', 'silence', 'manifest.rdqm')
        })
      ])
    })
  })
})
