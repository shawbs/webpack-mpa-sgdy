/*
 * @Author: Shawbs
 * @LastEditors: Shawbs
 * @Date: 2020-09-03 17:03:07
 * @LastEditTime: 2020-09-03 17:09:16
 */

const path = require('path');
var webpack = require('webpack');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const cleanWebpackPlugin = require("clean-webpack-plugin");
const merge = require('webpack-merge')
const conf = require('./index.js')
const webpackBaseConfig = require('./webpack.base.conf.js')


const devConfig = merge(webpackBaseConfig,{
	// mode: "development", // production, development, none

	devtool: 'cheap-module-eval-source-map',

	devServer:{
		clientLogLevel: 'warning',
		// contentBase: false, //告诉服务器从哪里提供内容
		quiet: true,
		compress: true,
		hot: true,
		host: conf.config.host,
		port: conf.config.port,
  		publicPath: conf.config.publicPath
	},
	
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		}),

		new webpack.HotModuleReplacementPlugin(),
	    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
	    new webpack.NoEmitOnErrorsPlugin(),

		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../static'),
				to: 'static',
				ignore: ['.*']
			}
		]),
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// })
		
		
		
	]
})


devConfig.module.rules.push({
	test: /\.less$/,
	use: ['style-loader','css-loader','less-loader']
})

conf.pages.forEach(page=>{
	devConfig.plugins.push(
		new HtmlWebpackPlugin({
			filename: `${page.path}.html`,
            template: path.resolve(__dirname,`../src/page/${page.path}.tpl.js`),
            chunks: [page.path],
            hash: true,
            minify: true,
		})
	)
})	

devConfig.plugins.push(
	new FriendlyErrorsPlugin({
		compilationSuccessInfo: {
          messages: [`Your application is running here: http://${conf.config.host}:${conf.config.port}`],
        }
	})
)


module.exports = devConfig