const Path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../src/scripts/index.js')
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [

    new CleanWebpackPlugin(),

    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../assets'), to: 'assets' },
      { from: Path.resolve(__dirname, '../wp-content-uploads'), to: 'wp-content-uploads' },
    ]),

    new HtmlWebpackPlugin({
      minify: false, filename: 'other-components.html', template: Path.resolve(__dirname, '../src/other-components.html'), 
    }),
    new HtmlWebpackPlugin({
      minify: false, filename: 'index.html', template: Path.resolve(__dirname, '../src/index.html'), 
    }),

  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
    ]
  }
};
