exports.tsjit = {
  test: /\.ts$/,
  use: ['ts-loader', 'angular2-template-loader', 'angular-router-loader'],
  exclude: /node_modules/
};

exports.html = {
  test: /\.html$/,
  use: 'raw-loader',
  exclude: /node_modules/
};

exports.css = {
  test: /\.css$/,
  use: ['to-string-loader', 'css-loader']
};

exports.js = {
  test: /\.js$/,
  use: ['to-string-loader', 'js-loader']
};
