<?php
/**
 * 配置连接数据库
 *  - localhost 本地连接
 *  - 数据库名
 *  - 数据库密码
 *  - 数据库用户名
 */
$conn = new mysqli("localhost","msg","msg","msg");




if ($conn->connect_error) {
    die("[ Connection Failed ]: ".$conn->connect_error);
}


/**
 * 提交表单数据到Mysql
 **/
$Name = htmlspecialchars($_POST['Name']);         // 获取Name文本框的数据，并将html标签进行转换
$Content = htmlspecialchars($_POST['Message']);   // 获取Message文本框的数据，并将html标签进行转换
if(!empty($Name) && !empty($Content)){  // 判断文本框是否为空
    $time = date('Y-m-d H:i:s');        // 获取当前时间
    $sql = "INSERT INTO msg (name, content, time)
            VALUES ('".$Name."','".$Content."','".$time."')";   // 使用Sql语句向Mysql数据库插入数据

    if ($conn->query($sql) === TRUE) {} else {
        echo "[ Error ]: ".$conn->error;
    }   
}



/**
 * 获取Mysql数据库数据，并输出json
 **/
mysqli_query($conn , "set names utf8");
$sql = 'SELECT name, content, time
        FROM msg';
$retval = $conn->query($sql);
if(!$retval ) {
    die('无法读取数据: ' . mysqli_error($conn));
}
/* 第一座“屎山”，不想删 */
/*while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
    echo "<li><span id='MsgName'>{$row['name']}</span>".
        "<span id='MsgContent'>{$row['content']}</span>".
        "<time id='SendTime' datetime='' title=''>{$row['time']}</time></li>";
}*/
class msgData {
   public $name;
   public $content;
   public $Time;
}

$data = array();

while ($row = mysqli_fetch_array($retval, MYSQLI_ASSOC)) {
    $msgData = new msgData();
    $msgData->name = $row["name"];
    $msgData->content = $row["content"];
    $msgData->Time = $row["time"];
    $data[] = $msgData;
}
echo json_encode($data);


/**
 * 阿巴阿巴
 **/
mysqli_free_result($retval);
$conn->close();
?>