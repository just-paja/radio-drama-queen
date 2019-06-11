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
      }
    ]
  ]
};
