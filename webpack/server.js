const webpack = require("webpack");
const webpackConfig = require("./webpack.dev.js");
let WebpackDevServer = require('webpack-dev-server');
let config = require('./webpack.config.js');
let routes=require('../server/router.js');


const compiler = webpack(webpackConfig);
const devServerOptions = Object.assign({
  after:app=>{
    routes(app)
  }
}, webpackConfig.devServer);
const server = new WebpackDevServer(compiler, devServerOptions);


server.listen(config.port, config.host, res => {});