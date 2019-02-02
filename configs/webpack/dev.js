// development config
const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',// bundle the client for webpack-dev-server and connect to the provided endpoint
    './index.tsx' // the entry point of our app
  ],
  devServer: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:8000',
        ws: true
      },
    }
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
  ],
});
