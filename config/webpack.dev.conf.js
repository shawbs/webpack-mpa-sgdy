
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

		// quiet: true,
		contentBase: path.join(__dirname, "static"),
		compress: true,
		hot: true,
		host: '0.0.0.0',
  		port: 3001,
  		publicPath: '/'
	},
	
	plugins: [


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
		new webpack.ProvidePlugin({
			$: 'jquery',
		})
		
		
		
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
          messages: [`Your application is running here: http://192.168.2.119:3001`],
        }
	})
)


module.exports = devConfig