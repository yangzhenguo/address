const { resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VuePlugin = require('vue-loader/lib/plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const mode = process.env.NODE_ENV || 'production'

module.exports = {
  mode,
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'gh-pages'),
    filename: '[name].[hash:8].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VuePlugin(),
    new ESLintPlugin({
      fix: true,
    }),
  ],
}
