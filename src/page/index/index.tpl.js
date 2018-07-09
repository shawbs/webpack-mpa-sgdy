
const index = require('./index.ejs')
const layout = require('../../layout')

module.exports = layout({
	title:'index page',
	content: index()
})

