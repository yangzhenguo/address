const { resolve } = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const base = require('./webpack.base')

const config = {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      { test: /\.css$/, use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          esModule: false
        }
      }, 'css-loader', {
        loader: 'postcss-loader', options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env', {
                  browsers: [
                    'last 2 versions',
                    '>1%'
                  ]
                },
              ],
            ],
          },
        },
      }] },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
  ],
}

module.exports = merge(base, config)
