
const layout = require('./default.ejs')

module.exports = function(options){
    
    return layout({
        meta: options.meta || [],    
        title: options.title || '',
        content: options.content || ''
    })
}