var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var webpackMajorVersion = require('webpack/package.json').version.split('.')[0];
module.exports = {
  context: __dirname,
  entry: './src/pages/editor/index.jsx',
  output: {
    path: path.join(__dirname, 'dist/webpack-' + webpackMajorVersion),
    publicPath: '',
    filename: 'bundle.js'
  },
  module: {
    rules: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
              presets: ['react', 'es2015']
          }
        },
        { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader?sourceMap' },
        {
            test: /\.(png|jpg|gif|eot|svg|ttf|woff)$/,
            loader: 'url-loader'
        }
    ]
},
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        'foo': 'bar'
      },
      title: 'index',
      template: './src/index.ejs'
    }),
    new CopyWebpackPlugin([
        {from: 'static'},
        {from: 'intl', to: 'js'}
    ]),
    new CopyWebpackPlugin([{
        from: 'node_modules/scratch-gui/dist/static/blocks-media',
        to: 'static/blocks-media'
    }]),
    new CopyWebpackPlugin([{
        from: 'node_modules/scratch-gui/dist/extension-worker.js'
    }]),
    new CopyWebpackPlugin([{
        from: 'node_modules/scratch-gui/dist/extension-worker.js.map'
    }]),
    new CopyWebpackPlugin([{
        from: 'node_modules/scratch-gui/dist/static/assets',
        to: 'static/assets'
    }])
  ]
};
