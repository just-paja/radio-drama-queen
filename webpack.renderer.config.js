const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
  },
  devtool: 'source-map',
  node: {
    global: true,
    path: true,
    electron: true,
    process: true,
  },
};
