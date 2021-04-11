/* globals require */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const packageJson = require('../package.json');

module.exports = {
  entry: {
    ui: './src/ui/index.ts',
    code: './src/code/index.ts',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      // Converts TypeScript code to JavaScript
      { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },

      // Enables including CSS by doing "import './file.css'" in your TypeScript code
      { test: /\.css$/, loader: [{ loader: 'style-loader' }, { loader: 'css-loader' }] },
      {
        test: /\.(woff2?|ttf|otf|eot)$/,
        exclude: /node_modules/,
        loader: 'base64-inline-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },

      // Allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      { test: /\.(png|jpg|gif|webp|zip)$/, loader: [{ loader: 'url-loader' }] },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VERSION': `"${packageJson.version}"`,
    }),
    new HtmlWebpackPlugin({
      template: './src/ui/index.html',
      filename: 'ui.html',
      inlineSource: '.(js)$',
      chunks: ['ui'],
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
};
