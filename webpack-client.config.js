const path = require('path');
const loaders = require('./src/webpack/loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    client: ['./src/main.ts']
  },
  output: {
    filename: 'app.js',
    path: path.resolve(path.join(__dirname, 'dist')),
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  externals: ['ng2-file-drop'],
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })
  ],
  module: {
    rules: [loaders.tsjit, loaders.html, loaders.css]
  }
};
