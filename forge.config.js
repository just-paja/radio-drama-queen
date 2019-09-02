const packageInfo = require('./package.json')

const allowedPatterns = [
  /package.json/,
  /[/\\]\.webpack($|[/\\]).*$/,
  /[/\\]src($|[/\\]electron($|[/\\].+))/,
  /[/\\]src($|[/\\]soundLibraries($|[/\\]constants))/,
  /[/\\]src($|[/\\]soundModules($|[/\\]constants))/,
  /[/\\]src($|[/\\]workers($|[/\\].+))/
]

function allowModule (moduleName) {
  allowedPatterns.push(new RegExp(`[/\\\\]node_modules($|[/\\\\]${moduleName}($|[/\\\\].+))`))
  const packageInfo = require(`${moduleName}/package.json`)
  if (packageInfo.dependencies) {
    Object.keys(packageInfo.dependencies).forEach(allowModule)
  }
}

function ignoreFile (file) {
  if (!file) {
    return false
  }
  const ignore = !allowedPatterns.some(pattern => pattern.test(file))
  if (!ignore) {
    console.log('Ignoring', file)
  }
  return ignore
}

allowModule('fluent-ffmpeg')
allowModule('fs-jetpack')
allowModule('request')
allowModule('tmp-promise')

module.exports = {
  main: '.webpack/main',
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'radio_drama_queen',
        description: packageInfo.summary
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: [
        'darwin'
      ]
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    }
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {}
    // }
  ],
  packagerConfig: {
    prune: false,
    ignore: ignoreFile
  },
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        prerelease: true,
        repository: {
          owner: 'just-paja',
          name: 'radio-drama-queen'
        }
      }
    }
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/index.js',
              name: 'main_window'
            },
            {
              html: './src/playback/index.html',
              js: './src/playback/index.js',
              name: 'playback_window'
            }
          ]
        }
      },
      '@electron-forge/plugin-auto-unpack-natives'
    ]
  ]
}
