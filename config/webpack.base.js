const { resolve } = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VuePlugin = require('vue-loader/lib/plugin')

const mode = process.env.NODE_ENV || 'development'
const statichash = mode === 'production' ? 'contenthash' : 'hash'
const chunkhash = mode === 'production' ? 'chunkhash' : 'hash'

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: `js/[name].[${chunkhash}:8].js`,
  },
  module: {
    rules: [
      { test: /\.vue$/, use: 'vue-loader' },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  browsers: '> 1%',
                },
                useBuiltIns: 'usage',
                corejs: 3,
              }],
            ],
          },
        },
      },
      { test: /\.(png|jpeg|jpg|gif)/i, use: {
        loader: 'url-loader',
        options: {
          limit: 8 << 10,
          esModule: false,
          name: `images/[name].[${statichash}:8].[ext]`
        }
      } },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VuePlugin(),
  ],
}
