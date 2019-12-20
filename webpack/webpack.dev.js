const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const webpackbase = require('./webpack.base.js');
const webpack = require('webpack');
const merge = require('webpack-merge');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
let config = require('./webpack.config.js');
const chalk = require('chalk');
const path = require('path');

let conlg = [];

for (let item in config.entry) {
  conlg.push(chalk.blueBright.bold('Your application is running here: ') + chalk.greenBright.bold(`http://${config.devServer}:${config.port}/${item}/`));
  conlg.push(chalk.blueBright.bold('Your application is running here: ') + chalk.greenBright.bold(`http://localhost:${config.port}/${item}/`));
}

let webpackDevConfig = {
  devtool: 'source-map',
  mode: 'development',
  entry: config.entry,
  output: {
    path: config.devPath,
    publicPath: '/',
    filename: '[name].[hash].js',
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300, //防止重复保存频繁重新编译,300ms内重复保存不打包
    poll: 1000 //每秒询问的文件变更的次数
  },
  devServer: {
    open: false,
    contentBase: config.devPath,
    publicPath: "/",
    hot: true,
    noInfo: true,
    port: config.port,
    host: config.host
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: conlg
      }
    }),
    new ProgressBarPlugin(
      {
        format: chalk.blueBright('  build :bar :percent (:elapsed seconds) '),
        clear: true,
        summary: false,
        customSummary: res => {
          process.stderr.write(chalk.blueBright('   '))
        }
      }
    ),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './vendor/vue.library.js')
    })
  ]
}

module.exports = merge(webpackbase, webpackDevConfig)