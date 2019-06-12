module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/electron-starter.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules')
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  devtool: 'source-map',
  node: {
    global: true,
    path: true,
    electron: true,
    process: true
  }
}
