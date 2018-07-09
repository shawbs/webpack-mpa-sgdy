const path = require('path')
module.exports = {
	pages: [
		{
			path: 'index/index',
			title: '首页'
		},
		{
			path: 'login/login',
			title: '登录'
		}

	],
	config: {
		root: path.resolve(__dirname,'../'),
		publicPath: '/',
		assetPath: 'static',
		host: '0.0.0.0',
		port: 3001
	}
}