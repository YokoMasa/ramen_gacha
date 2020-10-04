const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/js/app.js'],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'docs/js')
  },
  devServer: {
    contentBase: './docs',
    publicPath: '/js/',
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]]
            }
          }
        ]
      }
    ]
  },
};