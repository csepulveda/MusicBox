const path = require('path')

module.exports = {
  entry: path.join(__dirname, '/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/dist')
  },
  module: {
    loaders: [
      { test: /\.json?/, exclude: /node_modules/, loader: 'json' },
      { test: /\.jsx?/, exclude: /node_modules/, loader: 'babel' }
    ]
  }
}