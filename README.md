<h1 align="center">留言条</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Version-Beta%201.0-blue" />
  <a href="http://demo.longjie233.top"><img src="https://img.shields.io/badge/Click it to see-Demo-brightgreen"></a>
</p>

> 闲得无聊，写了个非常简单的多人读写数据库的操作，美名其曰留言。


**环境要求：**

  - PHP ≧ 5.6
  - SQLite3

**搭建方法：**

 1. 克隆仓库到自己的服务器
 2. 修改 php.ini 文件以开启支持 SQLite3 数据库
    - *（安装编译时已经加上了 SQLite3 就不需要修改配置文件了）*
    - 在 php.ini 中去注释或增加以下内容，然后重启 php-fpm 即可

```
extension_dir = 你的拓展.so文件的路径

extension=pdo.so
extension=sqlite.so
extension=pdo_sqlite.so
```

**备注：**

 - 留言消息需在数据库中手动删除
 - 留言时间记录的是服务器的时间，并非记录本地时间
 - 如果没有报错但数据无法插入到数据库时，给数据库文件和文件夹 777 权限