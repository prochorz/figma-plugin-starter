/* globals require */

const merge = require('webpack-merge');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

const common = require('./webpack.common.js');

const applescript = process.argv.indexOf('--applescript') !== -1;

const plugins = [];

if (applescript) {
  plugins.push(
    new WebpackShellPluginNext({
      onDoneWatch: {
        scripts: ['./applescript.sh'],
        parallel: true,
      },
    }),
  );
}

module.exports = merge.smartStrategy({
  entry: 'prepend',
  'module.rules.use': 'prepend',
})(common, {
  mode: 'development',
  // This is necessary because Figma's 'eval' works differently than normal eval
  devtool: 'inline-source-map',
  watch: true,
  module: {
    rules: [
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
              localIdentName: '[local]___[hash:base64:5]',
              sourceMap: true,
              url: true,
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
