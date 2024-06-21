// import {Path} from 'path';
// import {Webpack} from 'webpack';
// import {merge} from 'webpack-merge';
// import {common} from './webpack.common.js';

const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-eval-source-map',
	output: {
		chunkFilename: 'js/[name].chunk.js'
	},
	devServer: {
		inline: true,
		hot: true,
		index: 'index.html',
		liveReload: true,
		watchContentBase: true,
		contentBase: Path.join(__dirname, '../src'),
	},
	plugins: [
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				include: Path.resolve(__dirname, '../src'),
				enforce: 'pre',
				loader: 'eslint-loader',
				options: {
					emitWarning: true,
					fix: true,
				}
			},
			{
				test: /\.js$/,
				include: Path.resolve(__dirname, '../src'),
				loader: 'babel-loader'
			},
			{
				test: /\.s?css$/i,
				use: ['style-loader', 'css-loader?sourceMap=false', 'sass-loader']
			}
		]
	}
});
