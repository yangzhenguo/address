const { merge } = require('webpack-merge')
const ESLintPlugin = require('eslint-webpack-plugin')
const base = require('./webpack.base')

const config = {
  mode: 'development',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', {
        loader: 'postcss-loader', options: {
          postcssOptions: {
            plugins: [
              [
                'postcss-preset-env', {
                  browsers: [
                    'last 2 versions'
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
    new ESLintPlugin({
      fix: true,
    }),
  ],
}

module.exports = merge(base, config)
