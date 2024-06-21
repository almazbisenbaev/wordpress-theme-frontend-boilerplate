const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');
const common = require('./webpack.common.js');


module.exports = merge(common, {
  mode: 'production',
  // mode: 'development',
  // devtool: 'source-map',

  stats: 'errors-only',
  bail: true,
  output: {
    filename: 'js/[name].js', // 'js/[name].[chunkhash:8].js'
    chunkFilename: 'js/[name].chunk.js', // 'js/[name].[chunkhash:8].chunk.js'
  },

  plugins: [

    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new Webpack.optimize.ModuleConcatenationPlugin(),

    new MiniCssExtractPlugin({
      filename: 'style.css',
      minimize: false,
    }),

    new BeautifyHtmlWebpackPlugin({
      "indent_size": 2,
      "indent_with_tabs": true,
      "end_with_newline": true,
      "indent_level": 0,
      "preserve_newlines": true,
      "max_preserve_newlines": 5,
    }),

    // new StylelintPlugin({
    //   files: '**/*.css', // Specify the files to be linted (CSS files)
    //   fix: true, // Automatically fix linting errors if possible
    // }),

  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // use: 'babel-loader'
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s?css/i,
        use : [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }

});
