const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
  },
  externals: {
    'aws-sdk': 'commonjs2 aws-sdk',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'source-map',
  mode: 'production',
  plugins: [
    new ZipPlugin({
      filename: 'deployment.zip',
    }),
    new webpack.EnvironmentPlugin({
      LAMBDA_ENV: process.env.LAMBDA_ENV,
    }),
  ],
};
