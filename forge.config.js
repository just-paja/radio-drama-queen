const allowedPatterns = [
  /package.json/,
  /[/\\]\.webpack($|[/\\]).*$/,
  /[/\\]src($|[/\\]workers($|[/\\].+))/,
];

function allowModule(moduleName) {
  allowedPatterns.push(new RegExp(`[/\\\\]node_modules($|[/\\\\]${moduleName}($|[/\\\\].+))`));
  const packageInfo = require(`${moduleName}/package.json`);
  if (packageInfo.dependencies) {
    Object.keys(packageInfo.dependencies).forEach(allowModule);
  }
}

function ignoreFile(file) {
  if (!file) {
    return false;
  }
  const ignore = !allowedPatterns.some(pattern => pattern.test(file));
  if (!ignore) {
    console.log(file)
  } else {
    console.log('IGNORED:', file)
  }
  return ignore;
}

allowModule('fs-jetpack');
allowModule('request');

module.exports = {
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'radio_drama_queen'
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
    },
    // {
    //   name: '@electron-forge/maker-rpm',
    //   config: {}
    // }
  ],
  packagerConfig: {
    prune: false,
    ignore: ignoreFile,
  },
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
            }
          ]
        }
      },
      '@electron-forge/plugin-auto-unpack-natives'
    ]
  ]
};
