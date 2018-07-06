
const path = require('path')
var webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const cleanWebpackPlugin = require("clean-webpack-plugin")
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const util = require('./util.js')
const conf = require('./index.js')

let entryObject = {}

conf.pages.forEach((page)=>{
	entryObject[page.path] = path.resolve(__dirname,'../src/page/', page.path) + '.js'
})


const webpackConfig = {
	context: path.resolve(__dirname, "src"),

	entry: entryObject,

	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].[hash].bundle.js',
		publicPath: '/'
	},

	module: {
		rules: [

			{
		        test: /\.(js|jsx)$/,
		        include: path.resolve(__dirname,'../src'),
		        use: 'babel-loader'
	      	},
	      	{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
				  limit: 10000,
				  name: util.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{ 
				test: /\.ejs$/, 
				include: path.resolve(__dirname,'../src'),
				loader: 'ejs-loader' 
			}
			
		]
	},
	resolve: {
		extensions: [".js", ".json"],
		alias: {
			'page$': path.resolve(__dirname,'../src/page'),
			'~': path.resolve(__dirname, '../src')
		}
	}

}




module.exports = webpackConfig