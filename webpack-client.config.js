const path = require('path');
const loaders = require('./src/webpack/loaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

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
    }),

    new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators for Windows and MacOS
        /(.+)?angular(\\|\/)core(.+)?/,
        path.join(__dirname, 'src'), // location of your src
        {} // a map of your routes 
    ),

  ],
  module: {
    rules: [loaders.tsjit, loaders.html, loaders.css]
  }
};
