const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.render\.js$/,
        use: ['file-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin(['static'])
  ]
};
