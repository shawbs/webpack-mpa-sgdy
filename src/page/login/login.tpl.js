

const login = require('./login.ejs')

const layout = require('../../layout')

module.exports = layout({
    meta: [
        '<meta name="keywords" content="jquery,webpack,javascript,前端工程化,模块化" /> '
    ],
	title:'login page',
	content: login()
})

