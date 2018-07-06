
const path = require('path');
var webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const cleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackBaseConfig = require('./webpack.base.conf.js')
const conf = require('./index.js')
const util = require('./util.js')

const prodConfig = merge(webpackBaseConfig,{
	// mode: "production", // production, development, none

	devtool: 'none',
	
	plugins: [

		// new cleanWebpackPlugin(["dist"]),

		new UglifyJsPlugin({
	      uglifyOptions: {
	        compress: {
	          warnings: false
	        }
	      },
	      sourceMap: false,
	      parallel: true
	    }),

		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../static'),
				to: 'static',
				ignore: ['.*']
			}
		]),
		new ExtractTextPlugin({
			filename: util.assetsPath('css/[name].[contenthash].css'),
			allChunks: true
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),

		new webpack.optimize.CommonsChunkPlugin({
			name: "vendors",
			async: 'vendor-async',
			children: true,
			minChunks: 3
		})
	]


})

prodConfig.module.rules.push({
	test: /\.less$/,
	use: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: ['css-loader', 'less-loader']
	})
})

conf.pages.forEach(page=>{
	prodConfig.plugins.push(
		new HtmlWebpackPlugin({
			filename: `${page.path}.html`,
            template: path.resolve(__dirname,`../src/page/${page.path}.tpl.js`),
            chunks: [page.path,'manifest','vendors'],
            hash: true,
            minify: true,
		})
	)
})	


module.exports = prodConfig