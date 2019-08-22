import { LocalModule } from '..'
import jetpack from 'fs-jetpack'

function getFixtureDirectory (...dirPath) {
  return jetpack.path(__dirname, 'fixtures', ...dirPath)
}

function getFixtureUrl (...fixturePath) {
  return `file://${getFixtureDirectory(...fixturePath)}`
}

describe('LocalModule driver', () => {
  it('readLibrary reads module as a library', () => {
    return LocalModule.readLibrary({
      directory: getFixtureDirectory('flat')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('name', 'flat')
    })
  })

  it('readModule returns flat list of sounds', () => {
    return LocalModule.readModule({
      url: getFixtureUrl('flat')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('sounds', [
        expect.objectContaining({
          path: getFixtureUrl('flat', '1.044-second.mp3')
        }),
        expect.objectContaining({
          path: getFixtureUrl('flat', 'format.mp3')
        }),
        expect.objectContaining({
          path: getFixtureUrl('flat', 'id3-mixed-comment.mp3')
        })
      ])
    })
  })

  it('readModule uses directory name given manifest is missing', () => {
    return LocalModule.readModule({
      url: getFixtureUrl('flat')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('name', 'flat')
    })
  })

  it('readModule reads module name from manifest', () => {
    return LocalModule.readModule({
      url: getFixtureUrl('manifest')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('name', 'Manifest Test Module')
    })
  })

  it('readModule reads list of submodules', () => {
    return LocalModule.readModule({
      url: getFixtureUrl('nested')
    }).then(soundModule => {
      expect(soundModule).toHaveProperty('modules', [
        expect.objectContaining({
          url: getFixtureUrl('nested', 'more-silence')
        }),
        expect.objectContaining({
          url: getFixtureUrl('nested', 'silence')
        })
      ])
    })
  })

  it('readModule ignores hidden directories', () => {
    return LocalModule.readModule({
      url: getFixtureUrl('nested')
    }).then(soundModule => {
      expect(soundModule.modules).not.toContain([
        expect.objectContaining({
          url: getFixtureUrl('nested', '.hidden-module')
        })
      ])
    })
  })

  it('readModule ignores node_modules', () => {
    return LocalModule.readModule({
      url: getFixtureUrl('nested')
    }).then(soundModule => {
      expect(soundModule.modules).not.toContain([
        expect.objectContaining({
          url: getFixtureUrl('nested', 'node_modules')
        })
      ])
    })
  })
})
