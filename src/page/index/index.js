import _ from 'lodash';

import '../../style/index.less';

$(function(){
    $.ajax({
       url: 'https://cnodejs.org/api/v1/topics',
       success: function(res){
            let list = '<ul class="list">'
            for(let item of res.data){
                list += `<li data-id="${item.id}">${item.title}<span class="time">${item.create_at}</span></li>`
            }
            list+="</ul>"
            $('body').append(list)
       } 
    })
})

