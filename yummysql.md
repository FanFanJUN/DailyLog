# 云服务器安装MySQL
#### MySQL官方地址 MySQL Yum仓库的RPM安装包
[Download MySQL Yum Repository](https://dev.mysql.com/downloads/repo/yum/)
```
通过wget方式获取yum包
wget http://dev.mysql.com/get/mysql80-community-release-el7-1.noarch.rpm
```
#### 安装MySQL RPM安装包

```
yum localinstall mysql80-community-release-el7-1.noarch.rpm

看到安装MySQL8.0安装完成后可到/etc/yum.repos.d/目录下看到：
mysql-community.repo
mysql-community-source.repo
两个文件,说明MySQL Yum仓库添加成功。
```
#### 安装MySQL

```
yum install mysql-community-server

完成之后数据库会有一个初始密码，可通过一下命令查看：
[root@*******2dru8ftg3uz] grep 'temporary password' /var/log/mysqld.log

MySQL8.0 安装完成，下面进行启动配置。
```
#### 启动MySQL8.0

```
##启动MySQL服务
[root@**********2dru8ftg3uz log]# sudo service mysqld start
Redirecting to /bin/systemctl start mysqld.service
[root@**********2dru8ftg3uz log]# 
##查看MySQL进程
[root@******0x2dru8ftg3uz log]# ps -ef |grep mysql
mysql    10746     1  4 15:22 ?        00:00:00 /usr/sbin/mysqld
root     10791 10479  0 15:22 pts/0    00:00:00 grep --color=auto mysql
[root@*********dru8ftg3uz log]# service mysqld status
Redirecting to /bin/systemctl status mysqld.service
● mysqld.service - MySQL Server
   Loaded: loaded (/usr/lib/systemd/system/mysqld.service; enabled; vendor preset: disabled)
   Active: active (running) since Tue 2018-05-15 15:22:19 CST; 7min ago
     Docs: man:mysqld(8)
           http://dev.mysql.com/doc/refman/en/using-systemd.html
  Process: 10678 ExecStartPre=/usr/bin/mysqld_pre_systemd (code=exited, status=0/SUCCESS)
 Main PID: 10746 (mysqld)
   Status: "SERVER_OPERATING"
   CGroup: /system.slice/mysqld.service
           └─10746 /usr/sbin/mysqld

May 15 15:22:09 **********2dru8ftg3uz systemd[1]: Starting MySQL Server...
May 15 15:22:19 **********2dru8ftg3uz systemd[1]: Started MySQL Server.
##停止MySQL服务：service mysqld stop
## 访问mysql:   mysql -u root -p 密码提示，直接enter键
```
#### 修改mysql密码方法

```
 mysqladmin -u root -h 127.0.0.1 -p password
```
#### 外网/客户端(navicat等第三方工具)访问问题

```
客户访问报错:ERROR 1130: Host '192.168.1.3' is not allowed to connect to this MySQL

解决方案：
    服务端登陆MySQL，修改user表登陆用户的host。
shell>
mysql> use mysql
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+---------------------------+
| Tables_in_mysql           |
+---------------------------+
| columns_priv              |
此处省略n个表
| time_zone_transition      |
| time_zone_transition_type |
| user                      |
+---------------------------+
33 rows in set (0.00 sec)

mysql> update user set host='%' where user='root';
Query OK, 1 row affected (0.07 sec)
Rows matched: 1  Changed: 1  Warnings: 0
mysql> flush privileges;
重新远程连接OK


若ERROR 1062 (23000): Duplicate entry '%-root' for key 'PRIMARY' 不予理会

```
![image](https://res.cloudinary.com/dnmtpbj1g/image/upload/v1561464199/mysql/mysql.jpg)
