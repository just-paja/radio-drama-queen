import createTestServer from 'create-test-server'
import jetpack from 'fs-jetpack'

export function createFixtureServer (...rootPath) {
  return createTestServer().then((server) => {
    function getFixtureDirectory (...dirPath) {
      return jetpack.path(...rootPath, ...dirPath)
    }

    function getLocalUrl (...fixturePath) {
      return `file://${jetpack.path(...rootPath, ...fixturePath)}`
    }

    function getFixtureUrl (...fixturePath) {
      return `${server.url}/${fixturePath.join('/')}`
    }

    server.get('*', (req, res) => {
      const path = req.path.match(/\/$/) ? jetpack.path(req.path, 'manifest.rdqm') : req.path
      return jetpack.read(getFixtureDirectory(...path.split('/').filter(item => item)))
    })

    server.getFixtureDirectory = getFixtureDirectory
    server.getFixtureUrl = getFixtureUrl
    server.getLocalUrl = getLocalUrl
    return server
  })
}
