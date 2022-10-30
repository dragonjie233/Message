let input_Name      = $('#Send #Name'),
    input_Message   = $('#Send #Message'),
    post_File       = 'function/post.php';


var Cookie = {
    set: (cname,cvalue,exdays)=>{
        var d = new Date();
        d.setTime(d.getTime()+(exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
    
        document.cookie = cname + "=" + cvalue + "; " + expires;
    },
    get: (cname)=>{
        var name = cname + "=";
        var ca = document.cookie.split(';');
    
        for(var i=0; i<ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
    }
}


var msgNameCookie = Cookie.get("msgName");
if (msgNameCookie != "") {
    input_Name.val(msgNameCookie);
}


var showMsg = function(data) {
    let timeAgo = timeago;
    let dataEnd = data.reverse();
    let str = '';

    $.each(dataEnd,function(i,name,content,Time){
        str += '<li>';
        str += '<span id="MsgName">' + dataEnd[i].name + '</span>';
        str += '<span id="MsgContent">' + marked(dataEnd[i].content.replace(/\/n\//g,'</br>')) + '</span>';
        str += '<span id="SendTime" title="' + dataEnd[i].Time + '">' + timeAgo.format(dataEnd[i].Time, 'zh_CN') + '</time>';
        str += '</li>';
    });
    $('#Receive').html(str);
};


$('#Send').keydown(function(e) {
	let keyCode = e.which;

    if(!e.ctrlKey && keyCode == 13) {
	    if(input_Name.val() !== '' && input_Message.val() !='') {
            $.ajax({
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                url: post_File,
                data: $('#Send').serialize(),
                success: ()=>{
                    $('#Message').val('');
                    $.getJSON(post_File,showMsg);

                    if(input_Name.val() !== msgNameCookie || msgNameCookie != "") {
                        msgNameCookie = input_Name.val();
                        Cookie.set("msgName",msgNameCookie,365);
                    }
                }
            });
	    };

        $('#Send').submit(function(event){
            event.preventDefault();
        });
	};

    if(e.ctrlKey && e.keyCode === 13) {
        let n = input_Message.val() + '/n/';
        input_Message.val(n);
    }
});

$.getJSON(post_File,showMsg);


/**
 * TODO:
 *  [功能] 点击查看图片
 */
/*$('img').click(function() {
	window.open($(this).attr('data-src'));
});*/