let input_Name = $('#Send #Name'),
    input_Message = $('#Send #Message');



/* 功能：点击查看图片 */
/*$('img').click(function() {
	window.open($(this).attr('data-src'));
});*/


/**
 * 1.创建cookie
 */
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();

    document.cookie = cname + "=" + cvalue + "; " + expires;
}
/**
 * 2.获取cookie
 */
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');

    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return "";
}
/**
 *  3.使用cookie
 */
var msgName=getCookie("msgName");
if (msgName != "") {
    input_Name.val(msgName);
}

/**
 * 从服务端获取json并渲染到前端
 */
let getMsg = {
    type: "GET",
    async: true,
    url: 'post.php',
    dataType: 'JSON',
    data: {},
    success: function (data) {
        let dataEnd = data.reverse();　// 先将数据进行倒序处理
        let str = '';
        for(let i = 0;i < data.length;i++) {
            str += '<li>';
            str += '<span id="MsgName">' + dataEnd[i].name + '</span>';
            str += '<span id="MsgContent">' + dataEnd[i].content + '</span>';
            str += '<time id="SendTime" datetime="' + dataEnd[i].Time + '" title="' + dataEnd[i].Time + '">' + dataEnd[i].Time.split(' ').pop() + '</time>';
            str += '</li>';
        };
        $('#Receive').html(str);
        setTimeout(1000);
        $.ajax(getMsg);
    }
};
function a() {
    $.ajax(getMsg);
}
a();


/**
 *回车键提交表单
 */
$('#Send').keydown(function(e) {
	let curkey = e.which;

	if(curkey == 13) {
	    if(input_Name.val() !== '' && input_Message.val() !='') {
    	    /* 使用Ajax实现无刷新提交表单数据 */
            $.ajax({
                type: "POST",
                url: 'post.php',
                data: $('#Send').serialize(),
                success: function () {
                    // 提交成功后清除文本框的内容
                    $('#Message').val('');
                    a();
                },
                error : function() {
                    console.error('无法提交内容，请检查是否连接数据库')
                }
            });
            if(msgName != "" || input_Name.val() !== msgName) {
                msgName = input_Name.val();
                if (msgName!="" && msgName!=null) {
                    setCookie("msgName",msgName,365);
                }
            }
	    } else {
	        input_Message.attr('placeholder','!名称或内容不能为空');
	    };
        $('#Send').submit(function(event){
            event.preventDefault(); // 取消本身默认行为
        });
	}
});