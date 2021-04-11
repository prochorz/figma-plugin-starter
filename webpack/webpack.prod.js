/* globals require */

const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');

const analyze = process.argv.indexOf('--analyze') !== -1;

const plugins = [
  new CleanWebpackPlugin({
    cleanAfterEveryBuildPatterns: [path.resolve(__dirname, '../dist/ui.js')],
  }),
];

if (analyze) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge.strategy({
  entry: 'prepend',
  'module.rules': 'append',
  plugins: 'prepend',
})(common, {
  mode: 'production',
  module: {
    rules: [
      // obfuscation code
      {
        test: /\.tsx?$/,
        enforce: 'post',
        use: {
          loader: WebpackObfuscator.loader,
          options: {
            optionsPreset: 'low-obfuscation',
            compact: true,
            disableConsoleOutput: false,
            selfDefending: false,
          },
        },
        include: [path.resolve(__dirname, '../src')],
        exclude: [/svgr\.ts$/, /env\.ts$/],
      },
      {
        test: /\.(scss|sass|css)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: plugins,
});
