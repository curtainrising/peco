const path = require('path');
const webpack = require('webpack');
require('dotenv').config;

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    // path: path.resolve(__dirname, './build'),
    publicPath: '/'
  },
  mode: 'development',
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$|jsx/,
      exclude: /node_modules/,
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  resolve: { 
    extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json'],
    fallback: {
      "fs": false,
      "os": false,
      "path": false,
      "crypto": false,
    },
  },
  
  // devtool: 'eval-nosources-cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
  },
  externals: {
      // global app config object
      config: JSON.stringify({
          apiUrl: 'http://sammedalen.com'
      })
  },
  plugins: [
    new webpack.ProvidePlugin({
        "React": "react",
    }),
    new webpack.DefinePlugin({
      process: 'process/browser',
    }),
  ],
};
