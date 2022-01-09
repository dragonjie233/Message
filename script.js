let input_Name      = $('#Send #Name'),
    input_Message   = $('#Send #Message'),
    post_File       = 'post.php';


/**
 * cookie操作：创建cookie
 */
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();

    document.cookie = cname + "=" + cvalue + "; " + expires;
}
/**
 * cookie操作：获取cookie
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
 * cookie操作：使用cookie
 *   msgName 获取cookie名为msgName的内容
 *   如果cookie名为msgName的内容不为空则直接修改名称输入文本框的内容
 */
var msgName = getCookie("msgName");
if (msgName != "") {
    input_Name.val(msgName);
}




/**
 * 消息获取函数
 *  获取post.php给到的JSON的同时进行处理后渲染到#Receive的div标签
 */
var getMsg = function(data) {
    let dataEnd = data.reverse();　// JSON数据倒序排序
    let str = '';                  // 字符串拼接
    $.each(dataEnd,function(i,name,content,Time){
        str += '<li>';
        str += '<span id="MsgName">' + dataEnd[i].name + '</span>';
        str += '<span id="MsgContent">' + marked(dataEnd[i].content.replace(/\/n\//g,'</br>')) + '</span>';
        str += '<span id="SendTime" title="' + dataEnd[i].Time + '">' + dataEnd[i].Time.split(' ').pop() + '</span>';
        str += '</li>';
    });
    $('#Receive').html(str);
};

function timeOut() {
    setTimeout(20000);
    // 使用JQuery提供的$.getJSON方法获取JSON数据
    $.getJSON(post_File,getMsg);
}
timeOut();



/**
 * 键盘监听事件
 *  Enter 提交表单
 *  Ctrl + Enter 换行
 */
$('#Send').keydown(function(e) {
	let keyCode = e.which;

    if(keyCode == 13) {
	    if(input_Name.val() !== '' && input_Message.val() !='') {
    	    /* 使用Ajax实现无刷新提交表单数据 */
            $.ajax({
                type: "POST",
                url: post_File,
                data: $('#Send').serialize(),
                success: function () {
                    // 提交成功后清除文本框的内容
                    $('#Message').val('');
                    $.getJSON(post_File,getMsg);
                },
                error: function() {
                    console.error('无法提交内容，请检查是否连接数据库')
                }
            });

            // cookie操作：如果msgName不为空或名称输入文本框的内容不等于msgNmae，则
            if(msgName != "" || input_Name.val() !== msgName) {
                // 变量msgName赋值为名称输入文本框的内容
                msgName = input_Name.val();
                // 这里的 msgName != "" 指上面获取到的内容不是空内容，并且msgName不等于null
                if (msgName != "" && msgName!=null) {
                    // 创建cookie且名为msgName，cookie的内容为上面获取名称输入文本框的内容，365为cookie过期时间
                    setCookie("msgName",msgName,365);
                }
            }
	    } else {
            input_Name.attr('placeholder','你是谁？')
	        input_Message.attr('placeholder','你想说啥？');
	    };

        $('#Send').submit(function(event){
            event.preventDefault(); // 取消表单本身默认行为
        });
	};
});




/**
 * TODO:
 *  [功能] 点击查看图片
 */
/*$('img').click(function() {
	window.open($(this).attr('data-src'));
});*/