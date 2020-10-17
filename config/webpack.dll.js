const { resolve } = require('path')
const { DllPlugin } = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    venders: ['vue']
  },
  output: {
    path: resolve(process.cwd(), 'src/lib'),
    filename: '[name].[chunkhash:8].js',
    library: '[name]_[chunkhash:8]'
  },
  plugins: [
    new DllPlugin({
      name: '[name]_[chunkhash:8]',
      path: resolve(process.cwd(), 'src/lib/manifest.json')
    })
  ]
}
