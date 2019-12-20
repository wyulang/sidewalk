let HtmlWebpackPlugin = require('html-webpack-plugin');
// html-webpack-tags-plugin
let config = require('./webpack.config.js');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
let webpackBase = {
  resolve: {
    alias: {
      'lib': path.join(config.root, 'lib/'),
      '@css': path.join(config.root, 'src/css'),
      'vue$': 'vue/dist/vue.esm.js',
      '@component': path.join(config.root, 'src/component')
    },
    modules: ['node_modules', '*'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.vue']
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        config.vueLoader,
        "css-loader",
        {
          loader: "postcss-loader",
          options: { plugins: [require("autoprefixer")] }
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        config.vueLoader, {
          loader: "css-loader"
        }, {
          loader: "postcss-loader",
          options: { plugins: [require("autoprefixer")] }
        }, {
          loader: "less-loader",
        }, {
          loader: 'sass-resources-loader',
          options: {
            resources: path.join(config.root, 'src/css/base.less'),
          }
        }
      ]
    },
    {
      test: /\.scss$/,
      use: [
        config.vueLoader,
        {
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader"
        }, {
          loader: "postcss-loader",
          options: { plugins: [require("autoprefixer")] }
        }, {
          loader: "sass-loader",
        }, {
          loader: 'sass-resources-loader',
          options: {
            resources: path.join(config.root, 'src/css/base.less'),
          }
        }
      ]
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        transformAssetUrls: {
          video: ['src', 'poster'],
          source: 'src',
          img: 'src',
          image: 'xlink:href'
        },
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    },
    {
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/plugin-proposal-class-properties', 'syntax-dynamic-import']
        }
      },
      exclude: /node_modules/,
      // include: [process.cwd(), './src']
    },
    {
      test: /\.(gif|png|jpe?g|svg|ico)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          name: `assets/[name].[hash:5].[ext]`,
          limit: 5000, // 小于8k的图片自动转成base64格式，并且不会存在实体图片,
          // publicPath:'./'
        }
      },
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,   // 处理字体
      use: {
        loader: 'file-loader',
        options: {
          name: `assets/[name].[hash:5].[ext]`,
          publicPath: '../'
        }
      }
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor/vue-manifest.json')
    })
  ]
}

let clearFile = [];
for (item in config.entry) {
  clearFile.push(`${item}/*`);
  let templist = path.join(config.root, `.\\src/client\\${item}\\index.html`);
  templist = templist.replace(/[\\]/g, '/');
  htmlConfig = {
    template: templist,
    inject: true,
    title: 'wyulang',
    host: config.distPath,
    prod: false,
  }
  if (config.isProd) {
    htmlConfig.filename = `index.html`;
  } else {
    htmlConfig.chunks = [item];
    htmlConfig.filename = `${item}/index.html`;
  }
  webpackBase.plugins.push(
    new HtmlWebpackPlugin(htmlConfig)
  )
}

webpackBase.plugins.push(
  new CleanWebpackPlugin()
)


module.exports = webpackBase;