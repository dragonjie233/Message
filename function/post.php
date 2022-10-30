<?php
date_default_timezone_set('Asia/Shanghai');


// 连接数据库
class MsgDB extends SQLite3 {
    function __construct() {
        $this->open('./msg.db');
    }
}
$db = new MsgDB();


// 提交数据
if(isset($_POST['Name']) && isset($_POST['Message'])) {
    $Name = htmlspecialchars($_POST['Name']);
    $Content = htmlspecialchars($_POST['Message']);

    if(!empty($Name) && !empty($Content)){
        $time = date('Y-m-d H:i:s');

        $insert = "INSERT INTO msg (id, name, content, time) VALUES (NULL, '".$Name."','".$Content."','".$time."')";
        $insertRet = $db->exec($insert);

        if (!$insertRet) {
            echo $db->lastErrorMsg();
        } else {
            echo json_encode(array('status' => 01, 'msg' => '已发送内容'));
        }
    }
}


// 输出数据
$select = "SELECT name, content, time FROM msg";
$selectRet = $db->query($select);

class msgData {
   public $name;
   public $content;
   public $Time;
}

$data = array();

while ($row = $selectRet->fetchArray(SQLITE3_ASSOC)) {
    $msgData = new msgData();
    $msgData->name = $row["name"];
    $msgData->content = $row["content"];
    $msgData->Time = $row["time"];
    $data[] = $msgData;
}
echo json_encode($data);


$db->close();
?>