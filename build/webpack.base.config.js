const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ESLintPlugin = require('eslint-webpack-plugin')
const ElementPlus = require('unplugin-element-plus/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

const NODE_ENV = process.env.NODE_ENV

module.exports = {
  entry: path.join(__dirname,'..','src','index.js'),
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        exclude: /node_modules/,
        type: 'asset'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          'thread-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader:'sass-loader',
            options: {
              implementation: require('dart-sass')
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins:[
    new ESLintPlugin({
      extensions: ['js','vue']
    }),
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: '时事热点',
      favicon: path.join(__dirname,'..','src','assets','images','hot.png'),
      template: path.join(__dirname,'..','public','index.html')
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname,'..','src')
    },
    extensions: ['.js','.json','.vue','...'] // ...代表webpack默认的扩展名
  },
  optimization: {
    runtimeChunk: 'single'
  },
  output: {
    clean: true,
    path: path.join(__dirname,'..','dist'),
    filename: NODE_ENV === 'development' ? '[name].[hash].js' : '[name].[chunkhash].js'
  }
}