// import {Path} from 'path';
// import {Webpack} from 'webpack';
// import {merge} from 'webpack-merge';
// import {common} from './webpack.common.js';

const Path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-cheap-source-map',
	output: {
		chunkFilename: 'js/[name].chunk.js'
	},
	devServer: {
		hot: true,
		liveReload: true,
		static: {
			directory: Path.join(__dirname, '../src'),
			watch: true
		},
		historyApiFallback: true,
		port: 'auto',
		open: true,
		allowedHosts: 'all',
		client: {
			overlay: false,
			progress: true,
		},
	},
	plugins: [
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),
		new ESLintPlugin({
			emitWarning: true,
			fix: true,
			files: Path.resolve(__dirname, '../src')
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				include: Path.resolve(__dirname, '../src'),
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.s?css$/i,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								quietDeps: true,
								api: 'modern'
							}
						}
					}
				]
			}
		]
	}
});
