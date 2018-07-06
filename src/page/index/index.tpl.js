
const index = require('./index.ejs')
const layout = require('../../layout/default.ejs')

module.exports = layout({
	title:'index page',
	content: index()
})

