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
      minify: false, filename: 'components.html', template: Path.resolve(__dirname, '../src/components.html'), 
    }),
    new HtmlWebpackPlugin({
      minify: false, filename: 'index.html', template: Path.resolve(__dirname, '../src/index.html'), 
    }),
    new HtmlWebpackPlugin({
      minify: false, filename: 'cart-empty.html', template: Path.resolve(__dirname, '../src/cart-empty.html'), 
    }),
    new HtmlWebpackPlugin({
      minify: false, filename: 'page-template-default.html', template: Path.resolve(__dirname, '../src/page-template-default.html'), 
    }),
    new HtmlWebpackPlugin({
      minify: false, filename: 'blog-index.html', template: Path.resolve(__dirname, '../src/blog-index.html'), 
    }),
    new HtmlWebpackPlugin({
      minify: false, filename: 'blog-single.html', template: Path.resolve(__dirname, '../src/blog-single.html'), 
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
        test: /\.(ico|jpg|jpeg|png|gif|mp4|webm|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
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
