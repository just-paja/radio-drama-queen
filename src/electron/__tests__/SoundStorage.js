import fs from '../fs'

import { SoundStorage } from '../SoundStorage'
import { cacheFile } from '../jsonCache.js'

jest.mock('../fs', () => ({
  access: jest.fn(),
  constants: {
    R_OK: 'R_OK'
  }
}))

jest.mock('../jsonCache.js', () => ({
  cacheFile: jest.fn()
}))

describe('SoundStorage', () => {
  it('getCachePath returns path based on root, library, modules and sound name', () => {
    const storage = new SoundStorage({
      paths: {
        cache: '/var/tmp'
      }
    })
    expect(
      storage.getCachePath({
        libraryUrl: 'http://localhost:8080/manifest.rdqm',
        library: 'test-lib',
        module: 'actions/computer',
        path: 'http://localhost:8080/actions/computer/keyboard-tap.mp3'
      })
    ).toMatch(/\/var\/tmp\/.+\/actions\/computer\/keyboard-tap\.mp3/)
  })

  it('storeLocally returns current path as a cache path given it is already local', async () => {
    const storage = new SoundStorage({
      paths: {
        cache: '/var/tmp'
      }
    })
    expect(
      await storage.storeLocally({
        libraryUrl: 'http://localhost:8080/manifest.rdqm',
        library: 'test-lib',
        module: 'actions/computer',
        path: 'file:///var/tmp/23k4jho23ijh4/actions/computer/keyboard-tap.mp3'
      })
    ).toEqual({
      cachePath: '/var/tmp/23k4jho23ijh4/actions/computer/keyboard-tap.mp3',
      libraryUrl: 'http://localhost:8080/manifest.rdqm',
      library: 'test-lib',
      module: 'actions/computer',
      path: 'file:///var/tmp/23k4jho23ijh4/actions/computer/keyboard-tap.mp3'
    })
  })

  it('storeLocally returns current cache path given the file exists', async () => {
    fs.access.mockImplementation(() => Promise.resolve(true))
    const storage = new SoundStorage({
      paths: {
        cache: '/var/tmp'
      }
    })
    expect(
      await storage.storeLocally({
        libraryUrl: 'http://localhost:8080/manifest.rdqm',
        library: 'test-lib',
        module: 'actions/computer',
        path: 'http://localhost:8080/actions/computer/keyboard-tap.mp3'
      })
    ).toMatchObject({
      cachePath: /\/var\/tmp\/.+\/actions\/computer\/keyboard-tap.mp3/,
      libraryUrl: 'http://localhost:8080/manifest.rdqm',
      library: 'test-lib',
      module: 'actions/computer',
      path: 'http://localhost:8080/actions/computer/keyboard-tap.mp3'
    })
  })

  it('storeLocally fetches file given it does not exist yet', async () => {
    fs.access.mockRejectedValue(new Error('Simulated failure'))
    cacheFile.mockImplementation(arg => Promise.resolve(arg))
    const storage = new SoundStorage({
      paths: {
        cache: '/var/tmp'
      }
    })
    const result = await storage.storeLocally({
      libraryUrl: 'http://localhost:8080/manifest.rdqm',
      library: 'test-lib',
      module: 'actions/computer',
      path: 'http://localhost:8080/actions/computer/keyboard-tap.mp3'
    })
    expect(cacheFile).toHaveBeenCalled()
    expect(result).toMatchObject({
      cachePath: /\/var\/tmp\/.+\/actions\/computer\/keyboard-tap.mp3/,
      libraryUrl: 'http://localhost:8080/manifest.rdqm',
      library: 'test-lib',
      module: 'actions/computer',
      path: 'http://localhost:8080/actions/computer/keyboard-tap.mp3'
    })
  })
})
